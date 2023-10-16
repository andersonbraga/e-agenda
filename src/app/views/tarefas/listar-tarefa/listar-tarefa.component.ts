import { Component, OnInit } from '@angular/core';
import { ListarTarefaViewModel } from '../models/listar-tarefa-view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.css']
})
export class ListarTarefaComponent implements OnInit {
  tarefas: ListarTarefaViewModel[] = [];
   
  constructor(private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['tarefa'])).subscribe({
      next: (tarefa) => this.obterTarefas(tarefa),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterTarefas(tarefa: ListarTarefaViewModel[]) {
    this.tarefas = tarefa;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }
}
