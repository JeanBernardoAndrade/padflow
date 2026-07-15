import { supabase } from '@/lib/supabase';
import { Produto } from '@/types/database';

export const ProductService = {
  async getAll(): Promise<Produto[]> {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .order('nome', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(id: string): Promise<Produto> {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async create(produto: Omit<Produto, 'id' | 'created_at'>): Promise<Produto> {
    const { data, error } = await supabase
      .from('produtos')
      .insert([produto])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, produto: Partial<Produto>): Promise<Produto> {
    const { data, error } = await supabase
      .from('produtos')
      .update(produto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};