import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarContatoViewModel } from '../models/visualizar-contato-view-model';
import { ContatosService } from '../services/contatos.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-contato',
  templateUrl: './excluir-contato.component.html',
  styleUrls: ['./excluir-contato.component.css']
})
export class ExcluirContatoComponent implements OnInit {
  contatoVM!: VisualizarContatoViewModel ;
  idSelecionado: string | null = null;

  constructor(private contatoService: ContatosService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['contato'])).subscribe({
      next: (contato) => this.obterContato(contato),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.contatoService.excluir(this.contatoVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
    this.toastr.success("Contato excluido com sucesso.")
          }

          obterContato(contato: VisualizarContatoViewModel) {
            this.contatoVM = contato;
          }
        
          processarSucesso() {
            this.toastr.success(
              `O contato foi excluído com sucesso!`,
              'Sucesso'
            );
        
            this.router.navigate(['/contatos', 'listar']);
          }
        
          processarFalha(erro: Error) {
            this.toastr.error(erro.message, 'Erro');
          }


}
