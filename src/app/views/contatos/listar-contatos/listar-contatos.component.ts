import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatoViewModel } from '../models/listar-contato-view-model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css']
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];
  constructor(private contatosService: ContatosService, private route: ActivatedRoute, private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados)=> dados['contatos'])).subscribe({
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

}
