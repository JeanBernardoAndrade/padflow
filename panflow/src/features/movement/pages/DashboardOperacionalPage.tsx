import React from 'react';
import { useVitrine } from '../hooks/useDashboardOperacional';
import { MovementHistoryTable } from '../components/MovementHistoryTable';

export function DashboardOperacionalPage() {
  const { data, isLoading } = useVitrine();

  if (isLoading) return <div className="p-6">Sincronizando vitrine...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Vitrine & Operação</h1>

      {/* Alertas Críticos (Estoque Mínimo) */}
      {data?.alertas && data.alertas.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
          <h3 className="text-red-800 font-bold mb-2">⚠️ Alertas de Reposição</h3>
          <div className="flex gap-4 flex-wrap">
            {data.alertas.map(alerta => (
              <span key={alerta.produto_id} className="bg-white text-red-600 px-3 py-1 rounded shadow-sm text-sm font-semibold">
                {alerta.produto_nome}: Restam {alerta.saldo} (Mín: {alerta.estoque_minimo})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Esquerda: Saldo Atual (A Vitrine) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Disponibilidade Atual</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data?.estoque.map(item => (
              <div key={item.produto_id} className="border rounded p-3 text-center">
                <p className="text-gray-500 text-sm truncate">{item.produto_nome}</p>
                <p className={`text-2xl font-black ${item.saldo <= item.estoque_minimo ? 'text-red-500' : 'text-gray-800'}`}>
                  {item.saldo}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita: Auditoria em Tempo Real */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Últimos Movimentos</h2>
          <MovementHistoryTable />
        </div>
      </div>
    </div>
  );
}