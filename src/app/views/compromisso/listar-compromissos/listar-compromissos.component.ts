import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissoService } from '../services/compromissos.service';
import { FormsCompromissoViewModel } from '../models/forms-compromisso-view-model';
import { ListarCompromissoViewModel } from '../models/listar-compromisso-view-model';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent implements OnInit {
  compromissos: ListarCompromissoViewModel[] = [];
  constructor(private compromissoService: CompromissoService){}
  ngOnInit(): void {
    this.compromissoService.selecionarTodos().subscribe((res) =>{
      this.compromissos = res
    })
  }

}