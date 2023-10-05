import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsContatoViewModel } from '../models/forms-contato-view-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css']
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  idSelecionado: string | null = null;
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
    
    
    this.idSelecionado= this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado)return;

    this.contatoService.selecionarPorId(this.idSelecionado).subscribe((res)=>{
      this.form.patchValue(res);
    })
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
  
    this.contatoService.editar(this.idSelecionado!, this.contatoVM).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/contatos/listar']);
    });
  }
  onCampoAlterado() {
    console.log('Campo alterado');
    this.camposModificados = true;
  }

}

