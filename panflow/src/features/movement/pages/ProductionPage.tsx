import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productionSchema, ProductionFormData } from '../types/productionSchema';
import { useMovementMutations } from '../hooks/useMovements';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useEmployees } from '@/features/employees/hooks/useEmployees';
// Assumindo um hook de Auth que fornece o usuário logado
import { useAuth } from '@/features/auth/hooks/useAuth'; 

export function ProductionPage() {
  const { registerMovement, isRegistering, error } = useMovementMutations();
  const { data: produtos } = useProducts();
  const { data: funcionarios } = useEmployees();
  const { user } = useAuth(); // O ID do usuário logado (RN310)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: { quantidade: 1 }
  });

  const onSubmit = async (data: ProductionFormData) => {
    try {
      await registerMovement({
        produto_id: data.produto_id,
        funcionario_id: data.funcionario_id,
        usuario_id: user.id, // O sistema audita silenciosamente quem estava logado no tablet
        natureza: 'ENTRADA',
        tipo_movimento: 'PRODUCAO',
        quantidade: data.quantidade,
        observacao: data.observacao,
      });
      
      alert('Fornada registrada com sucesso! A vitrine foi atualizada.');
      reset(); // Limpa o form para o próximo registro rápido
    } catch (err: any) {
      alert(`Falha ao registrar: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar Produção (Nova Fornada)</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo: Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Produto</label>
          <select 
            {...register('produto_id')}
            className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione o que foi assado...</option>
            {produtos?.filter(p => p.ativo).map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
          {errors.produto_id && <p className="text-red-500 text-xs mt-1">{errors.produto_id.message}</p>}
        </div>

        {/* Campo: Quantidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade</label>
          <input 
            type="number" 
            step="0.001"
            {...register('quantidade', { valueAsNumber: true })}
            className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-lg font-bold"
          />
          {errors.quantidade && <p className="text-red-500 text-xs mt-1">{errors.quantidade.message}</p>}
        </div>

        {/* Campo: Funcionário (Padeiro responsável) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Padeiro Responsável</label>
          <select 
            {...register('funcionario_id')}
            className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Quem fez?</option>
            {funcionarios?.filter(f => f.ativo).map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>
          {errors.funcionario_id && <p className="text-red-500 text-xs mt-1">{errors.funcionario_id.message}</p>}
        </div>

        {/* Campo: Observação */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Observação (Opcional)</label>
          <input 
            type="text" 
            placeholder="Ex: Fornada extra para o final de tarde"
            {...register('observacao')}
            className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botão de Submit */}
        <button 
          type="submit" 
          disabled={isRegistering}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          {isRegistering ? 'Salvando...' : 'Salvar Fornada'}
        </button>
      </form>
    </div>
  );
}