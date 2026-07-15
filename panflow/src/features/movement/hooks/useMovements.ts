import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MovementService } from '../services/MovementService';
import { CreateMovementDTO } from '@/shared/database/types/movement.types';

export function useMovementHistory() {
  return useQuery({
    queryKey: ['movement_history'],
    queryFn: () => MovementService.getHistory(100),
    staleTime: 1000 * 15, // Cache curto de 15 segundos devido à alta volatilidade
  });
}

export function useMovementMutations() {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (data: CreateMovementDTO) => MovementService.register(data),
    onSuccess: () => {
      // O coração da reatividade: qualquer movimento bem-sucedido atualiza tudo!
      queryClient.invalidateQueries({ queryKey: ['movement_history'] });
      queryClient.invalidateQueries({ queryKey: ['products'] }); // O saldo atual do produto muda
      queryClient.invalidateQueries({ queryKey: ['dashboard_operacional'] });
    },
  });

  return {
    registerMovement: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    error: registerMutation.error,
  };
}