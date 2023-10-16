import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.development";

import { ListarTarefaViewModel } from "../models/listar-tarefa-view-model";
import { VisualizarTarefaViewModel } from "../models/visualizar-tarefa-view-model";
import { FormsTarefaViewModel } from "../models/forms-tarefa-view-model";


@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient) {}

  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    return this.http.post<any>(
      this.endpoint,
      tarefa,
      this.obterHeadersAutorizacao()
    ).pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public editar(id: string, tarefa: FormsTarefaViewModel) {
    return this.http.put<any>(
      this.endpoint + id,
      tarefa,
      this.obterHeadersAutorizacao()
    ).pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    return this.http.get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  public selecionarTarefaCompletaPorId(id: string): Observable<VisualizarTarefaViewModel> {
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

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
