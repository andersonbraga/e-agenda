import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './views/dashboard/dashboard.module';


import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompromissoModule } from './views/compromisso/compromisso.module';
import { ContatosModule } from './views/contatos/contatos.module';
import { NgSelectOption, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass: "toast-bottom-center",
      preventDuplicates: true,
    }),
    HttpClientModule,
    CoreModule,
    DashboardModule,
    
    
    
    
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
