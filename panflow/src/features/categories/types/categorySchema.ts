import { z } from 'zod';

export const categorySchema = z.object({
  nome: z.string().min(3, 'O nome da categoria deve ter pelo menos 3 caracteres'),
  descricao: z.string().optional(),
  ativo: z.boolean().default(true),
});

export type CategoryFormData = z.infer<typeof categorySchema>;