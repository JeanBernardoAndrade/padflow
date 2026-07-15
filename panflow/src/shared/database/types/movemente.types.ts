export type NaturezaMovimento = 'ENTRADA' | 'SAIDA';
export type TipoMovimento = 'PRODUCAO' | 'VENDA' | 'CONSUMO' | 'PERDA' | 'AJUSTE_POSITIVO' | 'AJUSTE_NEGATIVO';

export interface CreateMovementDTO {
  produto_id: string;
  natureza: NaturezaMovimento;
  tipo_movimento: TipoMovimento;
  quantidade: number;
  funcionario_id: string;
  usuario_id: string; // Pego do contexto de Auth logado
  motivo?: string;
  observacao?: string;
}