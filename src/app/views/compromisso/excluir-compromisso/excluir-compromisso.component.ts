import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { TipoLocalizacaoCompromissoEnum } from '../models/TipoLocal-compromisso-view-model';
import { FormsCompromissoViewModel } from '../models/forms-compromisso-view-model';
import { CompromissoService } from '../services/compromissos.service';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso-view-model';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent implements OnInit {
  form!: FormGroup;
  compromissoVM!: VisualizarCompromissoViewModel;
  idSelecionado: string | null = null;
  contatos: ListarContatoViewModel[] = [];

  @Input() value: any;
  tipoEnum = TipoLocalizacaoCompromissoEnum;
  
  

  constructor(private formBuilder: FormBuilder, private compromissoService: CompromissoService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService, private contatosService: ContatosService){}

  ngOnInit(): void {

    this.idSelecionado= this.route.snapshot.paramMap.get('id');
    if(!this.idSelecionado)return;

    this.initializeForm();

      this.contatosService.selecionarTodos().subscribe((res) =>{
        this.contatos = res;
      })

      

      

      this.compromissoService.selecionarCompromissoCompletoPorId(this.idSelecionado).subscribe((res)=>{
        this.compromissoVM = res
      })
 

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      tipoLocal: ['', [Validators.required]],
      link: ['', [Validators.required]],
      local: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contatoId: ['', [Validators.required]]
    });
  }

  

 


  gravar() {
    this.compromissoService.excluir(this.idSelecionado!).subscribe((res) => {
      this.router.navigate(['/compromissos', 'listar']);
      
    });
    this.toastr.success("Compromisso excluido com sucesso.")
  }
  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
}
