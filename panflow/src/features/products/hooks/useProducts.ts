import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '../services/ProductService';
import { ProductFormData } from '../types/productSchema';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getAll,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });
}

export function useProductMutations() {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    // Invalida também o dashboard caso ele já esteja consumindo esses dados
    queryClient.invalidateQueries({ queryKey: ['dashboard_admin'] }); 
  };

  const createMutation = useMutation({
    mutationFn: (data: ProductFormData) => ProductService.create(data),
    onSuccess: invalidateCache,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductFormData> }) => 
      ProductService.update(id, data),
    onSuccess: invalidateCache,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      ProductService.toggleStatus(id, status),
    onSuccess: invalidateCache,
  });

  return {
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    toggleProductStatus: toggleStatusMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}