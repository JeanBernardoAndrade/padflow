import { z } from 'zod';

export const productSchema = z.object({
  codigo: z.string().min(1, 'O código do produto é obrigatório'),
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  categoria_id: z.string().uuid('Selecione uma categoria válida'),
  descricao: z.string().optional(),
  preco_venda: z.number().min(0, 'O preço de venda não pode ser negativo'),
  custo_unitario: z.number().min(0, 'O custo unitário não pode ser negativo'),
  estoque_minimo: z.number().min(0, 'O estoque mínimo não pode ser negativo').default(0),
  controla_estoque: z.boolean().default(true),
  ativo: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;