import { Component, OnInit } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato-view-model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../services/contatos.service'; 
import { StatusFavorito } from '../models/status-favorito-enum';

// Adicione esse enum no topo, fora da classe do componente:
export enum FiltroContatos {
  TODOS = StatusFavorito.TODOS,
  FAVORITOS = StatusFavorito.FAVORITOS,
}

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];
  opcaoSelecionada: FiltroContatos = FiltroContatos.TODOS;
  StatusFavoritoEnum = StatusFavorito;
  FiltroContatosEnum = FiltroContatos;
  
  constructor(private route: ActivatedRoute, private toastr: ToastrService, private contatosService: ContatosService) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['contatos'])).subscribe({
      next: (contatos) => this.obterContatos(contatos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterContatos(contatos: ListarContatoViewModel[]) {
    this.contatos = contatos;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

  alterarFavorito(contato: ListarContatoViewModel): void {
    contato.favorito = !contato.favorito;
    this.contatosService.alterarFavorito(contato.id, contato).subscribe({
      next: (res: any) => {
        let status = res.dados.favorito == true ? 'adicionado aos' : 'removido dos';
        this.toastr.success(`Contato ${status} favoritos`, 'Sucesso');
        if (this.opcaoSelecionada == FiltroContatos.FAVORITOS) {
          const index = this.contatos.findIndex(x => x.id === contato.id);
          if (index !== -1) {
            this.contatos.splice(index, 1);
          }
        }
      },
      error: (erro) => {
        this.processarFalha(erro);
      }
    });
  }

  filtrar(): void {
    if (this.opcaoSelecionada == FiltroContatos.FAVORITOS) {
      this.contatos = this.contatos.filter(contato => contato.favorito);
    } else {
      this.recarregarTodosContatos();
    }
  }

  private recarregarTodosContatos(): void {
    this.route.data.pipe(map((dados) => dados['contatos'])).subscribe({
      next: (contatos) => this.obterContatos(contatos),
      error: (erro) => this.processarFalha(erro)
    });
  }

  selecionarTodos() {
    this.opcaoSelecionada = FiltroContatos.TODOS;
    this.recarregarTodosContatos();
  }

  selecionarFavoritos() {
    this.opcaoSelecionada = FiltroContatos.FAVORITOS;
    this.filtrar();
  }
}
