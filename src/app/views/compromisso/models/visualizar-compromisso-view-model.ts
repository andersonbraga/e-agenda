

import { VisualizarContatoViewModel } from "../../contatos/models/visualizar-contato-view-model";

export class VisualizarCompromissoViewModel{
  id: string;
  assunto: string;
  data: string;
  horaInicio: string;
  horaTermino: string;
  contato: string;

  constructor(id:string,assunto:string, data: string, horaInicio: string, horaTermino:string, contato: string){
    this.id = id
    this.assunto = assunto
    this.data = data
    this.horaInicio = horaInicio
    this.horaTermino = horaTermino
    this.contato = contato
  
  }
}