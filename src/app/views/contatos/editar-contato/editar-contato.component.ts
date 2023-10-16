import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css'],
})
export class EditarContatoComponent implements OnInit {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  camposModificados = false;

  
  
  
  constructor(private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService, private contatosService: ContatosService){}
  
  ngOnInit(): void {
    
    this.initializeForm();
    
    
    
    this.route.data.pipe(map((dados) => dados['contato'])).subscribe({
      next: (contato) => this.obterContato(contato),
      error: (erro) => this.processarFalha(erro),
    });

      this.camposModificados = false;

      
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      empresa: new FormControl('', [Validators.required]),
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

    

    this.contatoVM = this.form.value;
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.contatoService.editar(id, this.contatoVM).subscribe({
      next: (contato) => this.processarSucesso(contato),
      error: (erro) => this.processarFalha(erro),
    });
  }
  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
  obterContato(contato: FormsContatoViewModel) {
    this.contatoVM = contato;
    this.form.patchValue(this.contatoVM);
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastr.success(
      `O contato "${contato.nome}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Error');
  }
}