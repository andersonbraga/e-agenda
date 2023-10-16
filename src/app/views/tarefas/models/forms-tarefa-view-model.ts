import { FormsItemTarefaViewModel } from "./forms-item-tarefa-model";
import { PrioridadeTarefaEnum } from "./prioridade-tarefa-enum";


export interface FormsTarefaViewModel {
  titulo: string;
  prioridade: PrioridadeTarefaEnum;
  itens?: FormsItemTarefaViewModel[];  
}
