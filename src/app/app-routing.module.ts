import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'contatos',
    loadChildren: () =>
      import('./views/contatos/contatos.module').then((m) => m.ContatosModule),
  },

  {
    path: 'compromissos',
    loadChildren: () =>
      import('./views/compromisso/compromisso.module').then(
        (m) => m.CompromissoModule
      ),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./views/categoria/categoria.module').then(
        (m) => m.CategoriaModule
      ),
  },
  {
    path: 'despesas',
    loadChildren: () =>
      import('./views/despesas/despesas.module').then(
        (m) => m.DespesasModule
      ),
  },
  {
    path: 'tarefas',
    loadChildren: () =>
      import('./views/tarefas/tarefas.module').then(
        (m) => m.TarefasModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
