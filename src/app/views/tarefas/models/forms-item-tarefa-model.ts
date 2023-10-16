import { StatusItemTarefa } from "./status-item-tarefa-enum";


export interface FormsItemTarefaViewModel {
  id: string;           // UUID
  titulo?: string;      // nullable, então é opcional
  status: StatusItemTarefa;
  concluido: boolean;
}