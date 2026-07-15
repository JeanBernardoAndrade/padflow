import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EmployeeService } from '../services/EmployeeService';
import { EmployeeFormData } from '../types/employeeSchema';

export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: EmployeeService.getAll,
    staleTime: 1000 * 60 * 10, // Cache de 10 minutos (funcionários mudam com pouca frequência)
  });
}

export function useEmployeeMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['employees'] });
    queryClient.invalidateQueries({ queryKey: ['dashboard_admin'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: EmployeeFormData) => EmployeeService.create(data),
    onSuccess: invalidateCache,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmployeeFormData> }) => 
      EmployeeService.update(id, data),
    onSuccess: invalidateCache,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      EmployeeService.toggleStatus(id, status),
    onSuccess: invalidateCache,
  });

  return {
    createEmployee: createMutation.mutateAsync,
    updateEmployee: updateMutation.mutateAsync,
    toggleEmployeeStatus: toggleStatusMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}