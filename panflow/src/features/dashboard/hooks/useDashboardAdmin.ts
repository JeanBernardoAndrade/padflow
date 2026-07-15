import { useQuery } from '@tanstack/react-query';
import { DashboardAdminService } from '../services/DashboardAdminService';

export function useDashboardAdmin() {
  return useQuery({
    queryKey: ['dashboard_admin'],
    queryFn: DashboardAdminService.getIndicators,
    // Dashboard administrativo pode ter um cache um pouco mais longo, 
    // mas será invalidado automaticamente quando um CRUD for feito
    staleTime: 1000 * 60 * 5, 
  });
}