import { Component, OnInit } from '@angular/core';
import { ListarCategoriaViewModel } from '../models/listar-categoria-view-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  categorias: ListarCategoriaViewModel[] = [];
   
  constructor(private route: ActivatedRoute, private toastr: ToastrService){}

  ngOnInit(): void {
    this.route.data.pipe(map((dados)=> dados['categoria'])).subscribe({
      next: (categoria) => this.obterCategoria(categoria),
      error: (erro) => this.processarFalha(erro),
    });
    
  }
  obterCategoria(categoria: ListarCategoriaViewModel[]) {
    this.categorias = categoria;
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Erro');
  }

}