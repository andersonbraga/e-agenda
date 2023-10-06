import { Component, OnInit } from '@angular/core';
import { VisualizarCompletaContatoView } from '../models/visualizar-completa-contato-view.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContatosService } from '../services/contatos.service';

@Component({
  selector: 'app-visualizar-contato-completo',
  templateUrl: './visualizar-contato-completo.component.html',
  styleUrls: ['./visualizar-contato-completo.component.css']
})
export class VisualizarContatoCompletoComponent implements OnInit {
  contato: VisualizarCompletaContatoView = {} as VisualizarCompletaContatoView;

  constructor(
    private contatoService: ContatosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const contatoId = this.route.snapshot.params['id'];
    this.contatoService.selecionarContatoCompleto(contatoId).subscribe(data => {
      this.contato = data;
      
    });
    
  }
}