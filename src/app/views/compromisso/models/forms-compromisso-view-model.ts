import { TipoLocalizacaoCompromissoEnum } from "./TipoLocal-compromisso-view-model";


export class FormsCompromissoViewModel{
  id: string = '';
  tipoLocal: TipoLocalizacaoCompromissoEnum = TipoLocalizacaoCompromissoEnum.REMOTO;
  link: string = '';
  local: string = '';
  assunto: string = '';
  data: string = '';
  horaInicio: string = '';
  horaTermino: string = '';
  contatoId: string = '';

  constructor(id:string, tipoLocal: TipoLocalizacaoCompromissoEnum, link:string, local:string, assunto:string, data: string, horaInicio: string, horaTermino:string, contatoId: string){
    this.id = id
    this.tipoLocal = tipoLocal
    this.link = link
    this.local = local
    this.assunto = assunto
    this.data = data
    this.horaInicio = horaInicio
    this.horaTermino = horaTermino
    this.contatoId = contatoId
  
  }
}