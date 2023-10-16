import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../service/tarefa.service';
import { FormsTarefaViewModel } from '../models/forms-tarefa-view-model';
import { StatusItemTarefa } from '../models/status-item-tarefa-enum';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  form!: FormGroup;
  tarefaId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private tarefasService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tarefaId = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadTarefa();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
      prioridade: new FormControl(0, [Validators.required]),
      itens: this.formBuilder.array([]),
      itemTitulo: new FormControl('')
    });
  }

  loadTarefa() {
    this.tarefasService.selecionarPorId(this.tarefaId).subscribe(tarefa => {
      console.log(tarefa); 
      this.form.patchValue({
        
        titulo: tarefa.titulo,
        prioridade: tarefa.prioridade
      });
      
      
  
    
      while (this.itens.length !== 0) {
        this.itens.removeAt(0);
      }
  
   
      tarefa.itens!.forEach(item => {
        this.itens.push(this.formBuilder.group({
          titulo: item.titulo,
          status: item.status, 
          concluido: item.concluido
        }));
      });
    });
    
    console.log(this.itens.value);
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  adicionarItem() {
  const itemTitulo = this.form.get('itemTitulo')?.value;
  if (itemTitulo) {
    const newItem = this.formBuilder.group({
      titulo: new FormControl(itemTitulo, [Validators.required]),
      status: [StatusItemTarefa.Adicionado],
      concluido: [false]
    });
    this.itens.push(newItem);
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

    this.tarefasService.editar(this.tarefaId, dadosParaAPI).subscribe(
        (res: FormsTarefaViewModel) => this.processarSucesso(res),
        error => this.processarErro(error),
        
    );
    
  }

  processarErro(error: Error): void {
    this.toastrService.error(`Falha ao editar tarefa: ${error.message}`, 'Erro');
  }

  processarSucesso(res: FormsTarefaViewModel) {
    this.toastrService.success(`Tarefa ${res.titulo} editada com sucesso`, 'Sucesso');
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
}
