import { supabase } from '@/shared/database/supabaseClient';

export interface DashboardAdminData {
  totalCategorias: number;
  totalFuncionarios: number;
  produtos: {
    total: number;
    ativos: number;
    inativos: number;
  };
}

export const DashboardAdminService = {
  async getIndicators(): Promise<DashboardAdminData> {
    // Dispara todas as contagens em paralelo para máxima performance
    const [
      categoriasCount,
      funcionariosCount,
      produtosTotal,
      produtosAtivos,
      produtosInativos
    ] = await Promise.all([
      supabase.from('categoria').select('*', { count: 'exact', head: true }),
      supabase.from('funcionario').select('*', { count: 'exact', head: true }),
      supabase.from('produto').select('*', { count: 'exact', head: true }),
      supabase.from('produto').select('*', { count: 'exact', head: true }).eq('ativo', true),
      supabase.from('produto').select('*', { count: 'exact', head: true }).eq('ativo', false),
    ]);

    // Verifica se alguma das promises falhou
    if (
      categoriasCount.error || 
      funcionariosCount.error || 
      produtosTotal.error || 
      produtosAtivos.error || 
      produtosInativos.error
    ) {
      throw new Error('Erro ao carregar os indicadores do dashboard administrativo.');
    }

    return {
      totalCategorias: categoriasCount.count || 0,
      totalFuncionarios: funcionariosCount.count || 0,
      produtos: {
        total: produtosTotal.count || 0,
        ativos: produtosAtivos.count || 0,
        inativos: produtosInativos.count || 0,
      }
    };
  }
};