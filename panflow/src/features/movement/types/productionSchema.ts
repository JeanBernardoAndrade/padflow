import { z } from 'zod';

export const productionSchema = z.object({
  produto_id: z.string().uuid('Selecione o produto fabricado'),
  funcionario_id: z.string().uuid('Selecione o responsável pela fornada'),
  quantidade: z.number()
    .min(0.001, 'A quantidade deve ser maior que zero')
    .max(9999, 'Quantidade irreal para uma única fornada'),
  observacao: z.string().optional(),
});

export type ProductionFormData = z.infer<typeof productionSchema>;