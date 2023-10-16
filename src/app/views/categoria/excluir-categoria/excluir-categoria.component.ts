import { Component, OnInit } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria-view-model';
import { CategoriaService } from '../services/categoria.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})
export class ExcluirCategoriaComponent implements OnInit {
  
  categoriaVM!: VisualizarCategoriaViewModel;


  constructor(private categoriaService: CategoriaService, private router: Router, private route: ActivatedRoute , private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['categoria'])).subscribe({
      next: (categoria) => this.obterCategoria(categoria),
      error: (erro) => this.processarFalha(erro),
    });
  }

  gravar() {
    this.categoriaService.excluir(this.categoriaVM.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
   }

          obterCategoria(categoria: VisualizarCategoriaViewModel) {
            this.categoriaVM = categoria;
          }
        
          processarSucesso() {
            this.toastr.success(
              `A categoria ${this.categoriaVM.titulo} foi excluído com sucesso!`,
              'Sucesso'
            );
        
            this.router.navigate(['/categorias', 'listar']);
          }
        
          processarFalha(erro: Error) {
            this.toastr.error(erro.message, 'Erro');
          }


}
