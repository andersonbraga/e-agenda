import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ExcluirCategoriaComponent } from './excluir-categoria/excluir-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { CategoriaService } from './services/categoria.services';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    ListarCategoriaComponent,
    InserirCategoriaComponent,
    EditarCategoriaComponent,
    ExcluirCategoriaComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    CategoriaRoutingModule,
    NgxMaskDirective
    

    
  ],
  providers: [CategoriaService, provideNgxMask()],
})
export class CategoriaModule { }
