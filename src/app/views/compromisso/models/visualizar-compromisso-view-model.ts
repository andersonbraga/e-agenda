

import { ListarContatoViewModel } from "../../contatos/models/listar-contato-view-model";
import { VisualizarContatoViewModel } from "../../contatos/models/visualizar-contato-view-model";

export class VisualizarCompromissoViewModel{
  id: string;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contato: ListarContatoViewModel;

  constructor(id:string,assunto:string, data: string, horaInicio: string, horaTermino:string, contato: ListarContatoViewModel){
    this.id = id
    this.assunto = assunto
    this.data = data
    this.horaInicio = horaInicio
    this.horaTermino = horaTermino
    this.contato = contato
  
  }
}