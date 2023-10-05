import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato-view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { TipoLocalizacaoCompromissoEnum } from '../models/TipoLocal-compromisso-view-model';
import { FormsCompromissoViewModel } from '../models/forms-compromisso-view-model';
import { CompromissoService } from '../services/compromissos.service';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent implements OnInit {
  form!: FormGroup;
  compromissoVM!: FormsCompromissoViewModel;
  idSelecionado: string | null = null;
  contatos: ListarContatoViewModel[] = [];
  camposModificados = false;
  @Input() value: any;
  tipoEnum = TipoLocalizacaoCompromissoEnum;
  
  

  constructor(private formBuilder: FormBuilder, private compromissoService: CompromissoService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService, private contatosService: ContatosService){}

  ngOnInit(): void {
    
    this.initializeForm();

      this.contatosService.selecionarTodos().subscribe((res) =>{
        this.contatos = res;
      })

      this.idSelecionado= this.route.snapshot.paramMap.get('id');

      if(!this.idSelecionado)return;

      this.compromissoService.selecionarPorId(this.idSelecionado).subscribe((res)=>{
        this.form.patchValue(res);
      })
      this.camposModificados = false;

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      assunto: ['', [Validators.required, Validators.minLength(3)]],
      tipoLocal: ['', [Validators.required]],
      link: ['', [Validators.required]],
      local: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
      contatoId: ['', [Validators.required]]
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

    

    this.compromissoVM = this.form.value;

    this.compromissoService.editar(this.idSelecionado! , this.compromissoVM).subscribe((res) => {
      console.log(res);
      this.toastr.success("Compromisso Inserido com Sucesso");
      this.router.navigate(['/compromissos/listar']);
    });
  }
  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl || new FormControl();
  }
}
