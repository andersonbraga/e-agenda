import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { TipoLocalizacaoCompromissoEnum } from '../models/TipoLocal-compromisso-view-model';
import { CompromissoService } from '../services/compromissos.service';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso-view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit {
  
  compromissoVM!: VisualizarCompromissoViewModel;
  idSelecionado: string | null = null;
  contatos: ListarContatoViewModel[] = [];
  tipoEnum = TipoLocalizacaoCompromissoEnum;

  constructor(private formBuilder: FormBuilder, private compromissoService: CompromissoService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService, private contatosService: ContatosService){}

  ngOnInit(): void {

    this.idSelecionado= this.route.snapshot.paramMap.get('id');
    if(!this.idSelecionado)return;

 

      this.contatosService.selecionarTodos().subscribe((res) =>{
        this.contatos = res;
      })
      this.compromissoService.selecionarCompromissoCompletoPorId(this.idSelecionado).subscribe((res)=>{
        this.compromissoVM = res
      })
  }

  gravar() {
    this.compromissoService.excluir(this.idSelecionado!).subscribe(
      (res) => {
        this.router.navigate(['/compromissos', 'listar']);
        this.toastr.success("Compromisso excluído com sucesso.");
      },
      (err) => {
        this.toastr.error("Ocorreu um erro ao excluir o compromisso.");
      }
    );
  }
}
