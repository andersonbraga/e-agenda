import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsDespesaViewModel } from '../models/forms-despesa-view-model';
import { DespesaService } from '../service/despesa.service';
import { map } from 'rxjs';
import { VisualizarDespesaViewModel } from '../models/visualizar-despesa-view-model';

@Component({
  selector: 'app-excluir-despesa',
  templateUrl: './excluir-despesa.component.html',
})
export class ExcluirDespesaComponent implements OnInit {
  despesaVM!: VisualizarDespesaViewModel;

  constructor(
    private despesaService: DespesaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['despesa'])).subscribe({
      next: (despesa) => this.obterDespesa(despesa),
      error: (erro) => this.processarFalha(erro),
    });
  }

  excluir() {
    
    this.despesaService.excluir(this.despesaVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterDespesa(despesa: VisualizarDespesaViewModel) {
    this.despesaVM = despesa;
  }
  processarSucesso() {
    this.toastr.success(
      `A despesa foi excluído com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/despesas', 'listar']);
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Error');
  }
}
