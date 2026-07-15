import React from 'react';
import { useDashboardAdmin } from '../hooks/useDashboardAdmin';

export function DashboardAdminPage() {
  const { data, isLoading, isError } = useDashboardAdmin();

  if (isLoading) return <div>Carregando indicadores...</div>;
  if (isError) return <div>Erro ao carregar o dashboard.</div>;
  if (!data) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Visão Geral Cadastral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card: Categorias */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h2 className="text-sm text-gray-500">Categorias Cadastradas</h2>
          <p className="text-3xl font-bold text-gray-800">{data.totalCategorias}</p>
        </div>

        {/* Card: Produtos */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h2 className="text-sm text-gray-500">Produtos (Ativos / Inativos)</h2>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-800">{data.produtos.total}</p>
            <span className="text-sm text-green-600">{data.produtos.ativos} ativos</span>
            <span className="text-sm text-red-500">{data.produtos.inativos} inativos</span>
          </div>
        </div>

        {/* Card: Funcionários */}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h2 className="text-sm text-gray-500">Equipe</h2>
          <p className="text-3xl font-bold text-gray-800">{data.totalFuncionarios}</p>
        </div>
      </div>
    </div>
  );
}