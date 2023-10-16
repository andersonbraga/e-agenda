import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarefasRoutingModule } from './tarefas-routing.module';

import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { ExcluirTarefaComponent } from './excluir-tarefa/excluir-tarefa.component';
import { ListarTarefaComponent } from './listar-tarefa/listar-tarefa.component';
import { CoreModule } from 'src/app/core/core.module';
import { TarefaService } from './service/tarefa.service';
import { provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { InserirTarefasComponent } from './inserir-tarefa/inserir-tarefa.component';


@NgModule({
  declarations: [
    InserirTarefasComponent,
    EditarTarefaComponent,
    ExcluirTarefaComponent,
    ListarTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    CoreModule,
    ReactiveFormsModule,

    NgSelectModule
  ],
  providers: [TarefaService, provideNgxMask()]
})
export class TarefasModule { }
