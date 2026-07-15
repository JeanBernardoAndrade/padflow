import { supabase } from './supabaseClient'
import { Database } from '../database/types/database.types'

type ProdutoRow = Database['public']['Tables']['produto']['Row']
type EstoqueRow = Database['public']['Views']['vw_estoque_atual']['Row']

export const ProductService = {
  async getAllActive(): Promise<ProdutoRow[]> {
    const { data, error } = await supabase
      .from('produto')
      .select('*')
      .eq('ativo', true)
      .order('nome')
    
    if (error) throw error
    return data || []
  },

  async getStockList(search?: string, categoria?: string): Promise<EstoqueRow[]> {
    // Chamando nossa RPC customizada que otimiza filtros e busca
    const { data, error } = await supabase.rpc('rpc_estoque', {
      search_term: search || null,
      categoria_filter: categoria || null
    })

    if (error) throw error
    return data || []
  }
}