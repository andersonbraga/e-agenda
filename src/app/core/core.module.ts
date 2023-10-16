import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { InputFormComponent } from './input-form/input-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskApplierService } from 'ngx-mask/lib/ngx-mask-applier.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ListaComponent } from './lista/lista.component';
import { CardItemComponent } from './card-item/card-item.component';




@NgModule({
  declarations: [
    NavbarComponent,
    InputFormComponent,
    ListaComponent,
    CardItemComponent
    
  ],
  imports: [
    CommonModule, RouterModule, NgbCollapseModule, FormsModule, ReactiveFormsModule, NgxMaskDirective
  ],
  exports: [NavbarComponent, InputFormComponent, ListaComponent, CardItemComponent]
})
export class CoreModule { }
