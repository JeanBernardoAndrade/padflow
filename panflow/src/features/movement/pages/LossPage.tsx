import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { lossSchema, LossFormData } from '../types/outboundSchemas';
import { useMovementMutations } from '../hooks/useMovements';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useEmployees } from '@/features/employees/hooks/useEmployees';
import { useAuth } from '@/features/auth/hooks/useAuth'; 

export function LossPage() {
  const { registerMovement, isRegistering, error } = useMovementMutations();
  const { data: produtos } = useProducts();
  const { data: funcionarios } = useEmployees();
  const { user } = useAuth();

  // Idealmente, viria de um hook useSettings() criado na Sprint 2
  const motivosPerda = ['Queimado', 'Vencido', 'Danificado (Queda/Manuseio)', 'Sobra de Balcão']; 

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LossFormData>({
    resolver: zodResolver(lossSchema),
  });

  const onSubmit = async (data: LossFormData) => {
    try {
      await registerMovement({
        produto_id: data.produto_id,
        funcionario_id: data.funcionario_id,
        usuario_id: user.id,
        natureza: 'SAIDA',
        tipo_movimento: 'PERDA',
        quantidade: data.quantidade,
        motivo: data.motivo,
        observacao: data.observacao,
      });
      
      alert('Perda registrada. O estoque foi atualizado.');
      reset();
    } catch (err: any) {
      // Aqui a RN308 brilha: se o usuário tentar dar perda de 10 pães, mas só há 5 no sistema,
      // a RPC do Supabase lança um erro e exibimos exatamente isso na tela.
      alert(`Bloqueio de Sistema: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border-t-4 border-red-500 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Registrar Perda / Desperdício</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo: Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Produto Descartado</label>
          <select {...register('produto_id')} className="mt-1 w-full p-2 border rounded">
            <option value="">Selecione o produto...</option>
            {produtos?.filter(p => p.ativo).map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
          {errors.produto_id && <p className="text-red-500 text-xs mt-1">{errors.produto_id.message}</p>}
        </div>

        {/* Campo: Quantidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantidade Perdida</label>
          <input type="number" step="0.001" {...register('quantidade', { valueAsNumber: true })} className="mt-1 w-full p-2 border rounded" />
          {errors.quantidade && <p className="text-red-500 text-xs mt-1">{errors.quantidade.message}</p>}
        </div>

        {/* Campo: Motivo da Perda */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Motivo</label>
          <select {...register('motivo')} className="mt-1 w-full p-2 border rounded">
            <option value="">Por que foi perdido?</option>
            {motivosPerda.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          {errors.motivo && <p className="text-red-500 text-xs mt-1">{errors.motivo.message}</p>}
        </div>

        {/* Campo: Funcionário */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Reportado por</label>
          <select {...register('funcionario_id')} className="mt-1 w-full p-2 border rounded">
            <option value="">Selecione o funcionário...</option>
            {funcionarios?.filter(f => f.ativo).map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>
          {errors.funcionario_id && <p className="text-red-500 text-xs mt-1">{errors.funcionario_id.message}</p>}
        </div>

        <button type="submit" disabled={isRegistering} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded">
          {isRegistering ? 'Registrando...' : 'Confirmar Baixa'}
        </button>
      </form>
    </div>
  );
}