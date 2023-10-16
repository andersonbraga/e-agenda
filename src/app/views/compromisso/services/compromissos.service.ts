import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty, map, throwError } from "rxjs";
import { environment } from "src/environments/environment.development";
import { FormsCompromissoViewModel } from "../models/forms-compromisso-view-model";
import { ListarCompromissoViewModel } from "../models/listar-compromisso-view-model";
import { VisualizarCompromissoViewModel } from "../models/visualizar-compromisso-view-model";
import { FiltroCompromissos } from "../models/filtro-compromisso-enum";

@Injectable(

)
export class CompromissoService{
  private endpoint: string = 
  'https://e-agenda-web-api.onrender.com/api/compromissos/';


  constructor(private http: HttpClient){}

  public inserir(
    compromisso: FormsCompromissoViewModel
  ): Observable<FormsCompromissoViewModel> {
    return this.http.post<any>(
      this.endpoint,
      compromisso,
      this.obterHeadersAutorizacao()
    );
  }

  public selecionarTodos(filtro: FiltroCompromissos = FiltroCompromissos.TODOS): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(
        map((res) => {
          let compromissos = res.dados;
  
          const hoje = new Date();
          hoje.setHours(0, 0, 0, 0);
  
          switch (filtro) {
            case FiltroCompromissos.HOJE:
              return compromissos.filter((comp: ListarCompromissoViewModel) => new Date(comp.data).toDateString() === hoje.toDateString());            
              case FiltroCompromissos.PASSADO:
              return compromissos.filter((comp: ListarCompromissoViewModel) => new Date(comp.data) < hoje);            
              case FiltroCompromissos.FUTURO:
              return compromissos.filter((comp: ListarCompromissoViewModel) => new Date(comp.data) > hoje);            default:
              return compromissos;
          }
        })
      );
  }

  public editar(id: string, compromisso: FormsCompromissoViewModel){
    return this.http.put<any>(
      this.endpoint + id,
      compromisso,
      this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id:string) : Observable<FormsCompromissoViewModel>{
    return this.http.get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  public selecionarCompromissoCompletoPorId(
    id: string
  ): Observable<VisualizarCompromissoViewModel> {
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


