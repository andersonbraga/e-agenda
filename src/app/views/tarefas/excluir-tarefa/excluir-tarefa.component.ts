import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../service/tarefa.service';
import { VisualizarTarefaViewModel } from '../models/visualizar-tarefa-view-model';

@Component({
  selector: 'app-excluir-tarefa',
  templateUrl: './excluir-tarefa.component.html',
  styleUrls: ['./excluir-tarefa.component.css']
})
export class ExcluirTarefaComponent implements OnInit {
  tarefa!: VisualizarTarefaViewModel;

  constructor(
    private tarefasService: TarefaService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tarefa = this.route.snapshot.data['tarefa'];
  }

  excluir() {
    this.tarefasService.excluir(this.tarefa.id).subscribe(
      () => this.processarSucesso(),
      error => this.processarErro(error)
    );
  }

  processarErro(error: Error): void {
    this.toastrService.error(`Falha ao excluir tarefa: ${error.message}`, 'Erro');
  }

  processarSucesso() {
    this.toastrService.success(`Tarefa ${this.tarefa.titulo} excluída com sucesso`, 'Sucesso');
    this.router.navigate(['/tarefas/listar']);
  }

  cancelar() {
    this.router.navigate(['/tarefas/listar']);
  }
}
