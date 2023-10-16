import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ListarCompromissoViewModel } from '../models/listar-compromisso-view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];
   
  constructor(private route: ActivatedRoute, private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados)=> dados['compromisso'])).subscribe({
      next: (compromisso) => this.obterCompromissos(compromisso),
      error: (erro) => this.processarFalha(erro),
    });
    
  }
  obterCompromissos(compromisso: ListarCompromissoViewModel[]) {
    this.compromissos = compromisso;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

}