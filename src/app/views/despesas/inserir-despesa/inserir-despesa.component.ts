import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsDespesaViewModel } from '../models/forms-despesa-view-model';
import { ListarCategoriaViewModel } from '../../categoria/models/listar-categoria-view-model';
import { FormaPagamentoEnum } from '../models/forma-pagamento.enum';
import { DespesaService } from '../service/despesa.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../categoria/services/categoria.services';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent implements OnInit {
  form!: FormGroup;
  despesaVM!: FormsDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [];
  @Input() value: any;
  tipoEnum = FormaPagamentoEnum;

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private router: Router,
    private toastr: ToastrService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.initializeForm();


    

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required]],
      data: new FormControl(new Date().toString().substring(0, 10), [
        Validators.required,
      ]),
      tipoPagamento: ['', [Validators.required]],
      categoriasSelecionadas: [ [], [Validators.required] ]
    });
    this.categoriaService
      .selecionarTodos()
      .subscribe((res) => (this.categorias = res));
  }

  gravar() {
    console.log("Função gravar chamada");
    if (this.form.invalid) {
      console.log("Formulário inválido");
      Object.keys(this.form.controls).forEach(campo => {
        const control = this.form.get(campo);
        control?.markAsTouched();
        if (control?.invalid) {
          this.mostrarErros(campo);
        }
      });
      return; 
    }
    this.despesaVM = this.form.value;
    console.log("Dados a serem enviados:", this.despesaVM);
    this.despesaService.inserir(this.form?.value).subscribe((res) => {
      this.toastr.success(
        `A despesa "${res.descricao}" foi cadastrada com sucesso!`,
        'Sucesso'
      );

      this.router.navigate(['/despesas/listar']);
    });
  }

  mostrarErros(campo: string) {
    const control = this.form.get(campo);
    
    if (!control || !control.errors) return; //guard clause
  
    if (control.errors['required']) {
      this.toastr.warning(`O campo ${campo} é obrigatório.`);
    }  else if (control.errors['minlength']) {
      this.toastr.warning(`O campo ${campo} deve ter pelo menos ${control.errors['minlength'].requiredLength} caracteres.`);
    } else {
      this.toastr.warning('Houve um erro no formulário.');
    }
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
}
