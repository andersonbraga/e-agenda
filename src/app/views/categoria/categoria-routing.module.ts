import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarCategoriaViewModel } from './models/listar-categoria-view-model';
import { CategoriaService } from './services/categoria.services';
import { FormsCategoriaViewModel } from './models/forms-categoria-view-model';
import { VisualizarCategoriaViewModel } from './models/visualizar-categoria-view-model';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';

const listarCategoriaResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriaService).selecionarTodos();
};


const formsCategoriaResolver: ResolveFn<FormsCategoriaViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CategoriaService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarCategoriaResolver: ResolveFn<
  VisualizarCategoriaViewModel
> = (route: ActivatedRouteSnapshot) => {
  return inject(CategoriaService).selecionarCategoriaCompletoPorId(
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
    component: ListarCategoriaComponent,
    resolve: {categoria: listarCategoriaResolver}
  },

  {
    path: 'inserir',
    component: InserirCategoriaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarCategoriaComponent,
    resolve: { categoria: formsCategoriaResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirCategoriaComponent,
    resolve: { categoria: visualizarCategoriaResolver },
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
