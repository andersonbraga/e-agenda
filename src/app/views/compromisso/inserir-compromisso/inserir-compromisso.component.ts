import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsCompromissoViewModel } from '../models/forms-compromisso-view-model';
import { CompromissoService } from '../services/compromissos.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { TipoLocalizacaoCompromissoEnum } from '../models/TipoLocal-compromisso-view-model';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit {
  form!: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  contatos: ListarContatoViewModel[] = [];
  @Input() value: any;
  tipoEnum = TipoLocalizacaoCompromissoEnum;

  constructor(
    private formBuilder: FormBuilder,
    private compromissoService: CompromissoService,
    private router: Router,
    private toastr: ToastrService,
    private contatosService: ContatosService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.contatosService.selecionarTodos().subscribe(res => {
      this.contatos = res;
    });

    const tipoLocalControl = this.form.get('tipoLocal');
    const linkControl = this.form.get('link');
    
    if (tipoLocalControl && linkControl) {
      tipoLocalControl.valueChanges.subscribe(value => {
        if (value === this.tipoEnum.PRESENCIAL) {
          linkControl.disable();
        } else {
          linkControl.enable();
        }
      });
    }
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
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(campo => {
        const control = this.form.get(campo);
        control?.markAsTouched();
        if (control?.invalid) {
          this.mostrarErros(campo);
        }
      });
      return; 
    }

    this.compromissoVM = this.form.value;
    this.compromissoService.inserir(this.compromissoVM).subscribe(res => {
      this.toastr.success("Compromisso Inserido com Sucesso");
      this.router.navigate(['/compromissos/listar']);
    });
  }

  mostrarErros(campo: string) {
    switch (campo) {
      case 'assunto':
        this.toastr.warning('O assunto é obrigatório e deve ter pelo menos 3 caracteres.');
        break;
      case 'tipoLocal':
        this.toastr.warning('O tipo de local é obrigatório.');
        break;
      case 'local':
        this.toastr.warning('O local é obrigatório.');
        break;
      case 'data':
        this.toastr.warning('A data é obrigatória.');
        break;
      case 'horaInicio':
        this.toastr.warning('A hora de início é obrigatória e deve ser menor que a hora de término.');
        break;
      case 'horaTermino':
        this.toastr.warning('A hora de término é obrigatória e deve ser maior que a hora de início.');
        break;
      case 'contatoId':
        this.toastr.warning('O contato é obrigatório.');
        break;
      default:
        this.toastr.warning('Erro no campo ' + campo);
    }
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
}
