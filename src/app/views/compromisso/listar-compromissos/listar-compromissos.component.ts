import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/listar-compromisso-view-model';
import { ToastrService } from 'ngx-toastr';

import { FiltroCompromissos } from '../models/filtro-compromisso-enum';
import { CompromissoService } from '../services/compromissos.service';



@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];
  opcaoSelecionada: FiltroCompromissos = FiltroCompromissos.TODOS;
  FiltroCompromissosEnum = FiltroCompromissos;

  constructor(private toastr: ToastrService, private compromissosService: CompromissoService) {}

  ngOnInit(): void {
    this.recarregarCompromissosComFiltro();
  }

  obterCompromissos(compromissos: ListarCompromissoViewModel[]) {
    this.compromissos = compromissos;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

  filtrar(): void {
    this.recarregarCompromissosComFiltro();
  }

  private recarregarCompromissosComFiltro(): void {
    this.compromissosService.selecionarTodos(this.opcaoSelecionada).subscribe({
      next: (compromissos) => this.obterCompromissos(compromissos),
      error: (erro) => this.processarFalha(erro)
    });
  }
}
