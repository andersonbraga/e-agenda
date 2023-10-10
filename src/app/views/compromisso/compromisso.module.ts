import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { InputFormComponent } from 'src/app/core/input-form/input-form.component';
import { CompromissoService } from './services/compromissos.service';
import { CoreModule } from 'src/app/core/core.module';
import { CardCompromissoComponent } from './card-compromisso/card-compromisso.component';
import { ContatosModule } from '../contatos/contatos.module';
import { CompromissosRoutingModule } from './compromisso-routing.module';



@NgModule({
  declarations: [
    ListarCompromissosComponent,
    InserirCompromissoComponent,
    EditarCompromissoComponent,
    ExcluirCompromissoComponent,
    CardCompromissoComponent,
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    FormsModule,
    CoreModule,
    ContatosModule,
    CompromissosRoutingModule
 
  ],
  providers:[CompromissoService, provideNgxMask()]
})
export class CompromissoModule { }
