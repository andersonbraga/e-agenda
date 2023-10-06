import { Component, Input, OnInit } from '@angular/core';

import { ListarCompromissoViewModel } from '../models/listar-compromisso-view-model';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ActivatedRoute } from '@angular/router';
import { FormsContatoViewModel } from '../../contatos/models/forms-contato-view-model';

@Component({
  selector: 'app-card-compromisso',
  templateUrl: './card-compromisso.component.html',
  styleUrls: ['./card-compromisso.component.css']
})
export class CardCompromissoComponent {
  @Input({ required: true }) compromisso!: ListarCompromissoViewModel;
 
  

}
