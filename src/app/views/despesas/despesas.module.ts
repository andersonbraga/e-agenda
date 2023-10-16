import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesasRoutingModule } from './despesas-routing.module';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { ExcluirDespesaComponent } from './excluir-despesa/excluir-despesa.component';
import { ListarDespesaComponent } from './listar-despesa/listar-despesa.component';
import { DespesaService } from './service/despesa.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    InserirDespesaComponent,
    EditarDespesaComponent,
    ExcluirDespesaComponent,
    ListarDespesaComponent,
    
  ],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    NgSelectModule
    
  ],
  providers: [DespesaService, provideNgxMask()]
})
export class DespesasModule { }
