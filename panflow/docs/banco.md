// src/types/database.ts

export type CategoriaProduto = 'PAES' | 'CONFEITARIA' | 'SALGADOS' | 'OUTROS';
export type TipoMovimento = 'PRODUCAO' | 'VENDA' | 'CONSUMO' | 'PERDA' | 'AJUSTE';

export interface Produto {
  id: string;
  codigo: string | null;
  nome: string;
  categoria: CategoriaProduto;
  preco_venda: number;
  custo_unitario: number;
  controla_estoque: boolean;
  ativo: boolean;
  created_at: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  ativo: boolean;
  created_at: string;
}

export interface Movimento {
  id: string;
  produto_id: string;
  tipo: TipoMovimento;
  quantidade: number;
  funcionario_id: string | null;
  motivo: string | null;
  data_hora: string;
  observacao: string | null;
  created_at: string;
}

export interface EstoqueAtual {
  produto_id: string;
  codigo: string | null;
  produto_nome: string;
  categoria: CategoriaProduto;
  produzido: number;
  vendido: number;
  consumido: number;
  perdido: number;
  ajustado: number;
  saldo: number;
}