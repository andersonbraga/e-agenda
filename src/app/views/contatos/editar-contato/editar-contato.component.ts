import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  idSelecionado: string = '';
  camposModificados = false;
  

  nome = new FormControl('', [Validators.required])
  email = new FormControl('',[Validators.required, Validators.email])
  telefone = new FormControl('',[Validators.required])
  cargo =  new FormControl('',[Validators.required])
  empresa = new FormControl('',[Validators.required])

  constructor(private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router
    , private route: ActivatedRoute, private toastr: ToastrService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      cargo: this.cargo,
      empresa: this.empresa,

    })
    
    this.route.data.pipe(map((dados) => dados['contato'])).subscribe({
      next: (contato) => this.obterContato(contato),
      error: (erro) => this.processarFalha(erro),
    });
    this.camposModificados = false;
   
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
    
    
  
    this.contatoService.editar(this.idSelecionado, this.contatoVM).subscribe({
      next: (contato) => this.processarSucesso(contato),
      error: (erro) => this.processarFalha(erro),
    });
  }
  onCampoAlterado() {
    console.log('Campo alterado');
    this.camposModificados = true;
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

  obterContato(contato: FormsContatoViewModel) {
    this.contatoVM = contato;
    this.form.patchValue(this.contatoVM);
  }

}

