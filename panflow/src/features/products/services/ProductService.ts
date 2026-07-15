import { supabase } from '@/shared/database/supabaseClient';
import { Database } from '@/shared/database/types/database.types';
import { ProductFormData } from '../types/productSchema';

// Tipagem estendida para incluir o nome da categoria no retorno da listagem
export type ProdutoComCategoria = Database['public']['Tables']['produto']['Row'] & {
  categoria: { nome: string } | null;
};

export const ProductService = {
  async getAll(): Promise<ProdutoComCategoria[]> {
    const { data, error } = await supabase
      .from('produto')
      .select(`
        *,
        categoria ( nome )
      `)
      .order('nome');
      
    if (error) throw new Error(error.message);
    return data as ProdutoComCategoria[];
  },

  async create(payload: ProductFormData): Promise<void> {
    const { error } = await supabase
      .from('produto')
      .insert([payload]);
      
    if (error) throw new Error(error.message);
  },

  async update(id: string, payload: Partial<ProductFormData>): Promise<void> {
    const { error } = await supabase
      .from('produto')
      .update(payload)
      .eq('id', id);
      
    if (error) throw new Error(error.message);
  },

  async toggleStatus(id: string, currentStatus: boolean): Promise<void> {
    const { error } = await supabase
      .from('produto')
      .update({ ativo: !currentStatus })
      .eq('id', id);
      
    if (error) throw new Error(error.message);
  }
};