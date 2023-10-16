import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { FormsDespesaViewModel } from '../models/forms-despesa-view-model';
import { DespesaService } from '../service/despesa.service';
import { CategoriaService } from '../../categoria/services/categoria.services';
import { ListarCategoriaViewModel } from '../../categoria/models/listar-categoria-view-model';
import { FormaPagamentoEnum } from '../models/forma-pagamento.enum';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit {
  form!: FormGroup;
  despesaVM!: FormsDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [];
  camposModificados = false;

  tipoEnum = FormaPagamentoEnum;
  
  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private categoriaService: CategoriaService
  ) {}
  
  ngOnInit(): void {
    this.initializeForm();
    
    this.categoriaService
      .selecionarTodos()
      .subscribe((res) => (this.categorias = res));
    
    const despesa = this.route.snapshot.data['despesa'] as FormsDespesaViewModel;
    this.form.patchValue({
      ...despesa,
      data: despesa.data.toString().substring(0, 10),
    });
    
    this.camposModificados = false;
  }
  
  initializeForm() {
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required]],
      data: new FormControl(new Date().toString().substring(0, 10), [Validators.required]),
      formaPagamento: ['', [Validators.required]],
      categoriasSelecionadas: [[], [Validators.required]]
    });
  }
  
  gravar() {
    const campoModificado = Object.keys(this.form.controls).some((control) => this.form.get(control)?.dirty);
  
    if (!campoModificado) {
      this.toastr.warning("Nenhum campo foi modificado.");
      this.camposModificados = true;
      return;
    }

    if (this.form.invalid) {
      this.toastr.error('Formulário inválido.');
      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;
    this.despesaService.editar(id, this.form?.value).subscribe((res) => {
      this.toastr.success(`A despesa "${res.descricao}" foi cadastrada com sucesso!`, 'Sucesso');
      this.router.navigate(['/despesas/listar']);
    });
  }
  
  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
}
