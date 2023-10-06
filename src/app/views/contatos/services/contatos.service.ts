import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, empty, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { FormsContatoViewModel } from "../models/forms-contato-view-model";
import { ListarContatoViewModel } from "../models/listar-contato-view-model";
import { VisualizarContatoViewModel } from "../models/visualizar-contato-view-model";
import { VisualizarCompletaContatoView } from "../models/visualizar-completa-contato-view.model";

@Injectable(

)
export class ContatosService{
  private endpoint: string = 
  'https://e-agenda-web-api.onrender.com/api/contatos/';


  constructor(private http: HttpClient){}

  public inserir(
    contato: FormsContatoViewModel
  ): Observable<FormsContatoViewModel> {
    return this.http
      .post<any>(this.endpoint, contato, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        // Interceptar e tratar a mensagem de erro
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, contato: FormsContatoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, contato, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id:string) : Observable<any>{
    return this.http.get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarContatoCompleto(id:string) : Observable<VisualizarCompletaContatoView>{
    return this.http.get<any>(this.endpoint+ "visualizacao-completa/"  + id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados),
    catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarContatoCompletoPorId(
    id: string
  ): Observable<VisualizarContatoViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      )
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public excluir(id: string): Observable<any> {
    return this.http
      .delete(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
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

  private processarErroHttp(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Um erro inesperado ocorreu.';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Erro: ${error.error.message}`;
  } else {
    errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
  }
  return throwError(() => new Error(errorMessage));
}
  

  
}


