import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsCategoriaViewModel } from '../models/forms-categoria-view-model';
import { Observable, map } from 'rxjs';
import { ListarCategoriaComponent } from '../listar-categoria/listar-categoria.component';
import { VisualizarCategoriaViewModel } from '../models/visualizar-categoria-view-model';
import { environment } from 'src/environments/environment.development';
import { ListarCategoriaViewModel } from '../models/listar-categoria-view-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService { 
  private endpoint: string = 
  'https://e-agenda-web-api.onrender.com/api/categorias/';


  constructor(private http: HttpClient){}

  public inserir(
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http.post<any>(
      this.endpoint,
      categoria,
      this.obterHeadersAutorizacao()
    );
  }

   public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public editar(id: string, categoria: FormsCategoriaViewModel){
    return this.http.put<any>(
      this.endpoint + id,
      categoria,
      this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id:string) : Observable<FormsCategoriaViewModel>{
    return this.http.get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  public selecionarCategoriaCompletoPorId(
    id: string
  ): Observable<VisualizarCategoriaViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      )
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao());
  }

  public obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
  

  
}