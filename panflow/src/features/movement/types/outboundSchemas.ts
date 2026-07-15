import { z } from 'zod';

// Base comum para qualquer saída
const baseOutbound = {
  produto_id: z.string().uuid('Selecione o produto'),
  quantidade: z.number().min(0.001, 'Quantidade inválida'),
};

// Schema para Venda Rápida (Epic 3.5)
export const saleSchema = z.object({
  ...baseOutbound,
  // Na venda de balcão, o funcionário pode ser o próprio caixa (pegamos do Auth depois)
});

// Schema para Consumo Interno (Epic 3.6)
export const consumptionSchema = z.object({
  ...baseOutbound,
  funcionario_id: z.string().uuid('Quem consumiu?'),
  motivo: z.string().optional(), // Ex: "Teste de qualidade" ou "Lanche funcionário"
});

// Schema para Perdas (Epic 3.7) - Exige Motivo estrito
export const lossSchema = z.object({
  ...baseOutbound,
  funcionario_id: z.string().uuid('Quem reportou a perda?'),
  motivo: z.string().min(3, 'Selecione o motivo da perda'), // Ligado à tabela motivo_movimentacao
  observacao: z.string().optional(),
});

export type SaleFormData = z.infer<typeof saleSchema>;
export type ConsumptionFormData = z.infer<typeof consumptionSchema>;
export type LossFormData = z.infer<typeof lossSchema>;