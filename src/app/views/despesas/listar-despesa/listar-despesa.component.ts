import { Component, OnInit } from '@angular/core';
import { ListarDespesaViewModel } from '../models/listar-despesa-view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html',
  styleUrls: ['./listar-despesa.component.css']
})
export class ListarDespesaComponent implements OnInit {
  despesas: ListarDespesaViewModel[] = [];
   
  constructor(private route: ActivatedRoute, private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados)=> dados['despesa'])).subscribe({
      next: (despesa) => this.obterDespesas(despesa),
      error: (erro) => this.processarFalha(erro),
    });
    
  }
  obterDespesas(despesa: ListarDespesaViewModel[]) {
    this.despesas = despesa;
    
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

}