
export class ListarCompromissoViewModel{
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