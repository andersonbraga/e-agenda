import { Component, OnInit } from '@angular/core';
import { ListarContatoViewModel } from '../models/listar-contato-view-model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../services/contatos.service'; 
import { StatusFavorito } from '../models/status-favorito-enum';


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
    this.recarregarContatosComFiltro();
  }

  obterContatos(contatos: ListarContatoViewModel[]) {
    this.contatos = contatos;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

  favoritarContato(contato: ListarContatoViewModel): void {
    this.contatosService.favoritarContato(contato.id).subscribe({
      next: (res) => {
        let status = res.favorito ? 'adicionado aos' : 'removido dos';
        this.toastr.success(`Contato ${status} favoritos`, 'Sucesso');
        this.filtrar(); 
      },
      error: (erro) => this.processarFalha(erro),
    });
  }

  filtrar(): void {
    this.recarregarContatosComFiltro();
  }

  private recarregarContatosComFiltro(): void {
    this.contatosService.selecionarTodos(this.opcaoSelecionada).subscribe({
      next: (contatos) => this.obterContatos(contatos),
      error: (erro) => this.processarFalha(erro)
    });
  }
}

