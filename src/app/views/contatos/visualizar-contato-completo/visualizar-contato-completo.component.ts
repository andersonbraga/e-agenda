import { Component, OnInit } from '@angular/core';
import { VisualizarCompletaContatoView } from '../models/visualizar-completa-contato-view.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContatosService } from '../services/contatos.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualizar-contato-completo',
  templateUrl: './visualizar-contato-completo.component.html',
  styleUrls: ['./visualizar-contato-completo.component.css']
})
export class VisualizarContatoCompletoComponent implements OnInit {
  contato: VisualizarCompletaContatoView = {} as VisualizarCompletaContatoView;

  constructor(

    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(map((dados)=> dados['contato'])).subscribe({
      next: (contatos) => this.obterContatos(contatos),
      error: (erro) => this.processarFalha(erro),
    });

  }
  obterContatos(contato: VisualizarCompletaContatoView) {
    this.contato = contato;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }


}