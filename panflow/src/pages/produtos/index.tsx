import { Package, Plus, FileSpreadsheet } from 'lucide-react';

export function ProdutosPage() {
  // Mock estrutural para a Sprint 0
  const mockProdutos = [
    { codigo: 'P001', nome: 'Pão Francês', categoria: 'Pães', preco: 'R$ 0,50', status: 'Ativo' },
    { codigo: 'C003', nome: 'Bolo de Cenoura', categoria: 'Confeitaria', preco: 'R$ 15,00', status: 'Ativo' },
    { codigo: 'S012', nome: 'Coxinha de Frango', categoria: 'Salgados', preco: 'R$ 6,00', status: 'Ativo' },
  ];

  return (
    <div className="space-y-6">
      {/* Header da Página */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-6 w-6 text-amber-600" />
            Produtos
          </h1>
          <p className="text-sm text-slate-500">
            Cadastre e gerencie o catálogo de itens produzidos pela padaria.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar
          </button>
          <button className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-amber-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Grid de Dados / Tabela */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
                <th className="p-4 text-xs font-semibold text-slate-500">Código</th>
                <th className="p-4 text-xs font-semibold text-slate-500">Nome</th>
                <th className="p-4 text-xs font-semibold text-slate-500">Categoria</th>
                <th className="p-4 text-xs font-semibold text-slate-500">Preço de Venda</th>
                <th className="p-4 text-xs font-semibold text-slate-500">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {mockProdutos.map((p) => (
                <tr key={p.codigo} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="p-4 text-sm font-mono text-slate-600 dark:text-slate-400">{p.codigo}</td>
                  <td className="p-4 text-sm font-semibold">{p.nome}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{p.categoria}</td>
                  <td className="p-4 text-sm font-medium">{p.preco}</td>
                  <td className="p-4 text-sm">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <button className="text-amber-600 hover:text-amber-700 font-medium mr-3">Editar</button>
                    <button className="text-rose-600 hover:text-rose-700 font-medium">Inativar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}