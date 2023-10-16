import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria-view-model';
import { CategoriaService } from '../services/categoria.services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent implements OnInit {
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;


  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  initializeForm() {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this.initializeForm();

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

    this.categoriaVM = this.form.value;
    this.categoriaService.inserir(this.categoriaVM).subscribe(res => {
      this.toastr.success(`Categoria ${this.categoriaVM.titulo} Inserido com Sucesso`);
      this.router.navigate(['/categorias/listar']);
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



  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
}