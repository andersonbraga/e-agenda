import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarDespesaViewModel } from './models/listar-despesa-view-model';
import { DespesaService } from './service/despesa.service';
import { FormsDespesaViewModel } from './models/forms-despesa-view-model';
import { VisualizarDespesaViewModel } from './models/visualizar-despesa-view-model';
import { ListarDespesaComponent } from './listar-despesa/listar-despesa.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';

const listarDespesaResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
};


const formsDespesaResolver: ResolveFn<FormsDespesaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(DespesaService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarDespesaResolver: ResolveFn<
  VisualizarDespesaViewModel
> = (route: ActivatedRouteSnapshot) => {
  return inject(DespesaService).selecionarDespesaCompletoPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarDespesaComponent,
    resolve: {despesa: listarDespesaResolver}
  },

  {
    path: 'inserir',
    component: InserirDespesaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarDespesaComponent,
    resolve: { despesa: formsDespesaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirDespesaComponent,
    resolve: { despesa: visualizarDespesaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespesasRoutingModule { }
