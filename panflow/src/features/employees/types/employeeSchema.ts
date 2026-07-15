import { z } from 'zod';

// Definimos os cargos aceitos baseados nas regras de negócio (Padeiro, Atendente, Caixa, Gerente, Proprietário)
export const CARGOS_PERMITIDOS = ['Padeiro', 'Atendente', 'Caixa', 'Gerente', 'Proprietário'] as const;

export const employeeSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cargo: z.enum(CARGOS_PERMITIDOS, {
    errorMap: () => ({ message: 'Selecione um cargo válido' })
  }),
  ativo: z.boolean().default(true),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;