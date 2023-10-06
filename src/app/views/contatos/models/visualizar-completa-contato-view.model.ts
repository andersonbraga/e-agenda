import { ListarCompromissoViewModel } from "../../compromisso/models/listar-compromisso-view-model";

export class VisualizarCompletaContatoView {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  compromissos: ListarCompromissoViewModel[];

  constructor(id: string,nome: string,email: string,telefone: string,empresa: string,cargo: string,compromissos:ListarCompromissoViewModel[]
  ) 
  {
    this.id = id
    this.nome = nome
    this.email = email
    this.telefone = telefone
    this.empresa = empresa
    this.cargo = cargo
    this.compromissos = compromissos
  }
}





