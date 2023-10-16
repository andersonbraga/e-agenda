import { Component, OnInit } from '@angular/core';
import { ListarDespesaViewModel } from '../models/listar-despesa-view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FiltroDespesasEnum } from '../models/filtro-despesas-enum';
import { DespesaService } from '../service/despesa.service';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html',
  styleUrls: ['./listar-despesa.component.css']
})
export class ListarDespesaComponent implements OnInit {
  despesas: ListarDespesaViewModel[] = [];
  opcaoSelecionada = FiltroDespesasEnum.ULTIMOS_30_DIAS;
  FiltroDespesas = FiltroDespesasEnum;
   
  constructor(private route: ActivatedRoute, private toastr: ToastrService, private despesaService: DespesaService ){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados)=> dados['despesa'])).subscribe({
      next: (despesa) => this.obterDespesas(despesa),
      error: (erro) => this.processarFalha(erro),
    });
    
  }

  carregarDespesasRecentes(): void {
    this.despesaService.selecionarDespesasRecentes().subscribe({
      next: (despesas: ListarDespesaViewModel[]) => this.despesas = despesas,
      error: (erro: any) => this.processarFalha(erro)
    });
  }
  
  carregarDespesasAntigas(): void {
    this.despesaService.selecionarDespesasAntigas().subscribe({
      next: (despesas: ListarDespesaViewModel[]) => this.despesas = despesas,
      error: (erro: any) => this.processarFalha(erro)
    });
  }
  filtrar(): void {
    if (this.opcaoSelecionada === FiltroDespesasEnum.ANTIGAS) {
        this.carregarDespesasAntigas();
    } else if (this.opcaoSelecionada === FiltroDespesasEnum.ULTIMOS_30_DIAS) {
        this.carregarDespesasRecentes();
    }
}
  obterDespesas(despesa: ListarDespesaViewModel[]) {
    this.despesas = despesa;
    
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

}