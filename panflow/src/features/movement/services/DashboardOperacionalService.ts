import { supabase } from '@/shared/database/supabaseClient';
import { Database } from '@/shared/database/types/database.types';

type EstoqueRow = Database['public']['Views']['vw_estoque_atual']['Row'];

export const DashboardOperacionalService = {
  // Busca o saldo atual e os alertas de estoque mínimo
  async getVitrine(): Promise<{ estoque: EstoqueRow[], alertas: EstoqueRow[] }> {
    const { data, error } = await supabase
      .from('vw_estoque_atual')
      .select('*')
      .order('produto_nome');

    if (error) throw new Error(error.message);

    const alertas = data.filter(item => 
      item.controla_estoque && item.saldo <= item.estoque_minimo
    );

    return { estoque: data, alertas };
  },

  // Busca o histórico consolidado (Epic 3.8)
  async getHistorico(limit = 100) {
    const { data, error } = await supabase
      .from('movimento')
      .select(`
        id,
        natureza,
        tipo_movimento,
        quantidade,
        data_movimento,
        created_at,
        produto ( nome ),
        funcionario ( nome ),
        usuario ( nome )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data;
  }
};