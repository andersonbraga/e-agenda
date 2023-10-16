import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ContatosService } from '../services/contatos.service';
import { Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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
      
      });
 
      return; 
    }
    this.contatoVM = this.form.value;
    
    this.contatoService.inserir(this.contatoVM).subscribe({
      next: res => {
        this.toastr.success("Contato Inserido com Sucesso");
        this.router.navigate(['/contatos/listar']);
      },
      error: error => {
        this.toastr.error(`Houve uma falha ao tentar cadastrar o contato: ${error}`);
      }
    });
  }

  mostrarErros(campo: string) {
    const control = this.form.get(campo);
    
    if (!control || !control.errors) return; //guard clause
  
    if (control.errors['required']) {
      this.toastr.warning(`O campo ${campo} é obrigatório.`);
    } else if (control.errors['email']) {
      this.toastr.warning('O email não está no formato correto.');
    } else if (control.errors['minlength']) {
      this.toastr.warning(`O campo ${campo} deve ter pelo menos ${control.errors['minlength'].requiredLength} caracteres.`);
    } else {
      this.toastr.warning('Houve um erro no formulário.');
    }
  }

}
