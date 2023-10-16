import { VisualizarItemTarefaViewModel } from "./visualizar-item-tarefa-view-model";


export interface VisualizarTarefaViewModel {
  id: string;                   
  titulo?: string;
  dataCriacao: string;          
  dataConclusao?: string;        
  quantidadeItens: number;     
  percentualConcluido: number;   
  prioridade?: string;
  situacao?: string;
  itens?: VisualizarItemTarefaViewModel[];
}
