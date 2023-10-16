import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCategoriaViewModel } from '../models/forms-categoria-view-model';
import { CategoriaService } from '../services/categoria.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  form!: FormGroup;
  categoriaVM!: FormsCategoriaViewModel;
  camposModificados = false;

  initializeForm() {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],

    });
  }
  constructor(private formBuilder: FormBuilder, private categoriaService: CategoriaService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService){}
  
  ngOnInit(): void {
    
    this.initializeForm();
    this.camposModificados = false;

      this.route.data.pipe(map((dados) => dados['categoria'])).subscribe({
        next: (categoria) => this.obterCategoria(categoria),
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

    this.categoriaVM = this.form.value;

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.categoriaService.editar(id, this.categoriaVM).subscribe({
      next: (categoria) => this.processarSucesso(categoria),
      error: (erro) => this.processarFalha(erro),
    });
  }
  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }

  obterCategoria(contato: FormsCategoriaViewModel) {
    this.categoriaVM = contato;
    this.form.patchValue(this.categoriaVM);
  }

  processarSucesso(categoria: FormsCategoriaViewModel) {
    this.toastr.success(
      `O categoria "${categoria.titulo}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/categorias/listar']);
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Error');
  }
}
