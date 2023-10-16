import { FormaPagamentoEnum } from './forma-pagamento.enum';

export type FormsDespesaViewModel = {
  descricao: string;
  valor: number;
  data: string;
  formaPagamento: FormaPagamentoEnum;
  categoriasSelecionadas: string[];
};