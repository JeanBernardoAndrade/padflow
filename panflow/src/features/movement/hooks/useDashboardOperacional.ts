import { useQuery } from '@tanstack/react-query';
import { DashboardOperacionalService } from '../services/DashboardOperacionalService';

export function useVitrine() {
  return useQuery({
    queryKey: ['dashboard_operacional', 'vitrine'],
    queryFn: DashboardOperacionalService.getVitrine,
    staleTime: 1000 * 10, // Atualiza a cada 10 segundos
  });
}

export function useHistorico() {
  return useQuery({
    queryKey: ['movement_history'],
    queryFn: () => DashboardOperacionalService.getHistorico(50),
    staleTime: 1000 * 10, 
  });
}