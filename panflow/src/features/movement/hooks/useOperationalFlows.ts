import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MovementService } from '../services/MovementService';
import { useAuth } from '@/features/auth/hooks/useAuth';

export function useProduction() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ produto_id, quantidade, funcionario_id, observacao }: {
      produto_id: string;
      quantidade: number;
      funcionario_id: string;
      observacao?: string;
    }) => MovementService.register({
      produto_id,
      quantidade,
      funcionario_id,
      usuario_id: user.id,
      natureza: 'ENTRADA',
      tipo_movimento: 'PRODUCAO',
      observacao,
    }),
    onSuccess: () => {
      // Invalida em cadeia todas as views que dependem disso
      queryClient.invalidateQueries({ queryKey: ['disponibilidade'] });
      queryClient.invalidateQueries({ queryKey: ['operacao_hoje'] });
      queryClient.invalidateQueries({ queryKey: ['alertas'] });
    },
  });
}

export function useSales() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ produto_id, quantidade, funcionario_id }: {
      produto_id: string;
      quantidade: number;
      funcionario_id: string;
    }) => MovementService.register({
      produto_id,
      quantidade,
      funcionario_id,
      usuario_id: user.id,
      natureza: 'SAIDA',
      tipo_movimento: 'VENDA',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disponibilidade'] });
      queryClient.invalidateQueries({ queryKey: ['operacao_hoje'] });
      queryClient.invalidateQueries({ queryKey: ['alertas'] });
    },
  });
}