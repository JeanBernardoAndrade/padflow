import React from 'react';
import { useHistorico } from '../hooks/useDashboardOperacional';

export function MovementHistoryTable() {
  const { data: historico, isLoading } = useHistorico();

  if (isLoading) return <div className="p-4 text-gray-500">Carregando auditoria...</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3">Data/Hora</th>
            <th className="px-4 py-3">Produto</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Qtd</th>
            <th className="px-4 py-3">Operador</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {historico?.map((mov) => (
            <tr key={mov.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                {new Date(mov.created_at).toLocaleString('pt-BR')}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {mov.produto?.nome}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  mov.natureza === 'ENTRADA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {mov.tipo_movimento}
                </span>
              </td>
              <td className="px-4 py-3 font-bold">
                {mov.natureza === 'ENTRADA' ? '+' : '-'}{mov.quantidade}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {mov.funcionario?.nome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}