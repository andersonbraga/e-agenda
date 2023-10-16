import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { TipoLocalizacaoCompromissoEnum } from '../models/TipoLocal-compromisso-view-model';
import { FormsCompromissoViewModel } from '../models/forms-compromisso-view-model';
import { CompromissoService } from '../services/compromissos.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent implements OnInit {
  form!: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  contatos: ListarContatoViewModel[] = [];
  camposModificados = false;
 
  tipoEnum = TipoLocalizacaoCompromissoEnum;
  
  
  
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
  constructor(private formBuilder: FormBuilder, private compromissoService: CompromissoService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService, private contatosService: ContatosService){}
  
  ngOnInit(): void {
    
    this.initializeForm();
    
    
    

    
   

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
      this.camposModificados = false;

      this.route.data.pipe(map((dados) => dados['compromisso'])).subscribe({
        next: (compromisso) => this.obterContato(compromisso),
        error: (erro) => this.processarFalha(erro),
      });

    



   
      this.contatosService.selecionarTodos().subscribe({
        next: (contato) =>  this.contatos = contato,
        error: (erro) => this.processarFalha(erro),
      });

  }
  

  

 


  gravar() {
    const campoModificado = Object.keys(this.form.controls).some((control) =>
      this.form.get(control)?.dirty
    );
  
    if (!campoModificado) {
      console.log('Nenhum campo foi modificado.');
      this.toastr.warning("Nenhum campo foi modificado.");
      this.camposModificados = true;
      return;
    }

    if (this.form.invalid) {
      console.log('Formulário inválido.');
      return;
    }

    

    this.compromissoVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.compromissoService.editar(id, this.compromissoVM).subscribe({
      next: (compromisso) => this.processarSucesso(compromisso),
      error: (erro) => this.processarFalha(erro),
    });
  }
  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }

  obterContato(contato: FormsCompromissoViewModel) {
    this.compromissoVM = contato;
    this.compromissoVM.data = new Date(this.compromissoVM.data).toISOString().split('T')[0]; 
    this.form.patchValue(this.compromissoVM);
  }

  processarSucesso(compromisso: FormsCompromissoViewModel) {
    this.toastr.success(
      `O compromisso "${compromisso.assunto}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/compromissos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Error');
  }
}
