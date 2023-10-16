import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from '@angular/router';


import { FormsTarefaViewModel } from './models/forms-tarefa-view-model';

import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { VisualizarTarefaViewModel } from './models/visualizar-tarefa-view-model';
import { ListarTarefaViewModel } from './models/listar-tarefa-view-model';
import { TarefaService } from './service/tarefa.service';
import { ListarTarefaComponent } from './listar-tarefa/listar-tarefa.component';
import { InserirTarefasComponent } from './inserir-tarefa/inserir-tarefa.component';


const listarTarefasResolver: ResolveFn<ListarTarefaViewModel[]> = () => {
  return inject(TarefaService).selecionarTodos();
};

const formsTarefaResolver: ResolveFn<FormsTarefaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(TarefaService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(TarefaService).selecionarTarefaCompletaPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarTarefaComponent,
    resolve: { tarefa: listarTarefasResolver }
  },
  {
    path: 'inserir',
    component: InserirTarefasComponent,
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: { tarefa: formsTarefaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirTarefaComponent,
    resolve: { tarefa: visualizarTarefaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}
