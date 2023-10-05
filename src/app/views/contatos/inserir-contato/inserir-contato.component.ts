import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styleUrls: ['./inserir-contato.component.css']
})
export class InserirContatoComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;

  constructor(
    private formBuilder: FormBuilder, 
    private contatoService: ContatosService, 
    private router: Router, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      empresa: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
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

    

    this.contatoVM = this.form.value;

    this.contatoService.inserir(this.contatoVM).subscribe(res => {
      this.toastr.success("Contato Inserido com Sucesso");
      this.router.navigate(['/contatos/listar']);
    });
  }
  
  mostrarErros(campo: string) {
    switch (campo) {
      case 'nome':
        this.toastr.warning('O nome é obrigatório e deve ter pelo menos 3 caracteres.');
        break;
      case 'email':
        this.toastr.warning('O email é obrigatorio e tem que estar no formato certo.');
        break;
      case 'telefone':
        this.toastr.warning('O telefone é obrigatório.');
        break;
      case 'cargo':
        this.toastr.warning('O cargo é obrigatório.');
        break;
      case 'empresa':
        this.toastr.warning('A empresa é obrigatório.');
        break;
      default:
        this.toastr.warning('O campo é obrigatório e deve ter pelo menos 3 caracteres. ' + campo);
    }
  }
}
