import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '../services/CategoryService';
import { CategoryFormData } from '../types/categorySchema';

// Hook para buscar dados (Leitura)
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: CategoryService.getAll,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });
}

// Hook para mutações (Escrita)
export function useCategoryMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormData) => CategoryService.create(data),
    onSuccess: invalidateCache,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryFormData> }) => 
      CategoryService.update(id, data),
    onSuccess: invalidateCache,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      CategoryService.toggleStatus(id, status),
    onSuccess: invalidateCache,
  });

  return {
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    toggleCategoryStatus: toggleStatusMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}