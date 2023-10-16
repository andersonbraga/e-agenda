import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { TipoLocalizacaoCompromissoEnum } from '../models/TipoLocal-compromisso-view-model';
import { CompromissoService } from '../services/compromissos.service';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso-view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit {
  
  compromissoVM!: VisualizarCompromissoViewModel;
 

  tipoEnum = TipoLocalizacaoCompromissoEnum;

  constructor(private compromissoService: CompromissoService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['compromisso'])).subscribe({
      next: (compromisso) => this.obterCompromisso(compromisso),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.compromissoService.excluir(this.compromissoVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
          }

          obterCompromisso(compromisso: VisualizarCompromissoViewModel) {
            this.compromissoVM = compromisso;
          }
        
          processarSucesso() {
            this.toastr.success(
              `O compromisso foi excluído com sucesso!`,
              'Sucesso'
            );
        
            this.router.navigate(['/compromissos', 'listar']);
          }
        
          processarFalha(erro: Error) {
            this.toastr.error(erro.message, 'Erro');
          }


}
