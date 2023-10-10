import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirContatoComponent } from './inserir-contato/inserir-contato.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContatosService } from './services/contatos.service';
import { ListarContatosComponent } from './listar-contatos/listar-contatos.component';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';

import { CoreModule } from 'src/app/core/core.module';
import { CardContatoComponent } from './card-contato/card-contato.component';
import { VisualizarContatoCompletoComponent } from './visualizar-contato-completo/visualizar-contato-completo.component';
import { ExcluirContatoComponent } from './excluir-contato/excluir-contato.component';
import { ContatosRoutingModule } from './contatos-routing.module';
import { CompromissosRoutingModule } from '../compromisso/compromisso-routing.module';




@NgModule({
  declarations: [
    InserirContatoComponent,
    ListarContatosComponent,
    EditarContatoComponent,
    CardContatoComponent,
    VisualizarContatoCompletoComponent,
    ExcluirContatoComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    CoreModule,
    FormsModule,
    ContatosRoutingModule,
    CompromissosRoutingModule
    
    
    
  ],
  providers:[ContatosService, provideNgxMask()]
})
export class ContatosModule { }
