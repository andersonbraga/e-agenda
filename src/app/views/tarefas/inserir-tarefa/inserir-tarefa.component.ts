import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../service/tarefa.service';
import { FormsTarefaViewModel } from '../models/forms-tarefa-view-model';
import { StatusItemTarefa } from '../models/status-item-tarefa-enum';

@Component({
  selector: 'app-inserir-tarefa',
  templateUrl: './inserir-tarefa.component.html',
  styleUrls: ['./inserir-tarefa.component.css']
})
export class InserirTarefasComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private tarefasService: TarefaService,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: this.formBuilder.array([]),
      itemTitulo: new FormControl('')
    });
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  adicionarItem() {
    const itemTitulo = this.form.get('itemTitulo')?.value;
    if (itemTitulo) {
      this.itens.push(this.formBuilder.group({
        titulo: new FormControl(itemTitulo, [Validators.required]),
        status: [StatusItemTarefa.Adicionado], 
        concluido: [false]
      }));
      this.form.get('itemTitulo')?.setValue('');
    }
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }

  gravar() {
    if (this.form.invalid) {
        Object.keys(this.form.controls).forEach(campo => {
            const control = this.form.get(campo);
            control?.markAsTouched();
        });
        return;
    }
    
    const dadosParaAPI = {
        titulo: this.form.get('titulo')?.value,
        prioridade: Number(this.form.get('prioridade')?.value), 
        itens: this.form.get('itens')?.value
    };

    console.log(dadosParaAPI); // saber o tipo da prioridade

    this.tarefasService.inserir(dadosParaAPI).subscribe(
        (res: FormsTarefaViewModel) => this.processarSucesso(res),
        error => this.processarErro(error)
    );
}

  processarErro(error: Error): void {
    this.toastrService.error(`Falha ao adicionar tarefa: ${error.message}`, 'Erro');
  }

  processarSucesso(res: FormsTarefaViewModel) {
    this.toastrService.success(`Tarefa ${res.titulo} adicionada com sucesso`, 'Sucesso');
    this.router.navigate(['/tarefas/listar']);
  }

  getFormControl(name: string): FormControl {
    const control = this.form.get(name);
    if (control instanceof FormControl) {
        return control;
    } else {
        throw new Error(`Control ${name} not found or not a FormControl`);
    }
}

getControlFromGroup(groupControl: AbstractControl, name: string): FormControl {
  if (groupControl instanceof FormGroup) {
      const control = groupControl.get(name);
      if (control instanceof FormControl) {
          return control;
      } else {
          throw new Error(`Control ${name} not found or not a FormControl in the given group`);
      }
  } else {
      throw new Error('Provided control is not a FormGroup');
  }
}
}
