import React, { useState } from 'react';
import { useProduction } from '../hooks/useOperationalFlows';
import { useStock } from '../hooks/useStock'; // Consome a view vw_disponibilidade
import { useEmployees } from '@/features/employees/hooks/useEmployees';

export function QuickProductionForm() {
  const { data: estoque, isLoading } = useStock();
  const { data: funcionarios } = useEmployees();
  const { mutateAsync: registrarProducao, isPending } = useProduction();

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [funcionarioId, setFuncionarioId] = useState<string>('');

  // Adição rápida por botões de toque (Zero digitação)
  const addQtd = (val: number) => setQuantidade(prev => prev + val);

  const handleSubmit = async () => {
    if (!selectedProduct || quantidade <= 0 || !funcionarioId) {
      alert('Selecione o padeiro, o produto e a quantidade!');
      return;
    }

    try {
      await registrarProducao({
        produto_id: selectedProduct,
        quantidade,
        funcionario_id: funcionarioId,
      });
      // Reset instantâneo para a próxima fornada
      setSelectedProduct(null);
      setQuantidade(0);
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    }
  };

  if (isLoading) return <div>Carregando vitrine...</div>;

  return (
    <div className="p-4 bg-gray-50 rounded-xl space-y-6 select-none">
      {/* 1. Seleção Rápida de Operador */}
      <div className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
        <span className="font-bold text-gray-700">Padeiro:</span>
        <select 
          value={funcionarioId} 
          onChange={e => setFuncionarioId(e.target.value)}
          className="flex-1 p-2 bg-gray-100 border-none rounded font-semibold text-lg"
        >
          <option value="">Selecione quem você é...</option>
          {funcionarios?.filter(f => f.cargo === 'Padeiro' || f.cargo === 'Gerente').map(f => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>
      </div>

      {/* 2. Grid Visual de Produtos (Product Badges) */}
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Selecione o Produto Assado:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {estoque?.map(item => {
            const isSelected = selectedProduct === item.produto_id;
            return (
              <button
                key={item.produto_id}
                type="button"
                onClick={() => setSelectedProduct(item.produto_id)}
                className={`p-4 rounded-xl text-left transition-all transform active:scale-95 border-2 ${
                  isSelected 
                    ? 'bg-blue-600 text-white border-blue-700 shadow-lg' 
                    : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400 shadow-sm'
                }`}
              >
                <div className="font-bold text-lg leading-tight truncate">{item.produto_nome}</div>
                <div className={`text-xs mt-2 font-semibold flex items-center justify-between ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                  <span>Vitrine: {item.disponivel}</span>
                  {item.status_operacional === 'CRITICO' && <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px]">CRÍTICO</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Teclado de Soma Rápida (Numpad Tátil) */}
      {selectedProduct && (
        <div className="bg-white p-4 rounded-xl shadow-sm border space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-bold">Quantidade da Fornada:</span>
            <span className="text-4xl font-black text-blue-600">{quantidade}</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {[5, 10, 20, 30, 50, 100].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => addQtd(val)}
                className="bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 font-black py-3 rounded-lg text-lg transition-colors border border-blue-200"
              >
                +{val}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setQuantidade(0)}
              className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg"
            >
              Zerar
            </button>
            <button
              type="button"
              disabled={isPending || quantidade === 0 || !funcionarioId}
              onClick={handleSubmit}
              className="w-2/3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-black py-3 rounded-lg shadow-md text-xl transition-all"
            >
              {isPending ? 'SALVANDO...' : '✔ REGISTRAR FORNADA'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}