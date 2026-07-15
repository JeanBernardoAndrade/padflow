import { supabase } from '@/shared/database/supabaseClient';
import { Database } from '@/shared/database/types/database.types';
import { CategoryFormData } from '../types/categorySchema';

type CategoriaRow = Database['public']['Tables']['categoria']['Row'];

export const CategoryService = {
  async getAll(): Promise<CategoriaRow[]> {
    const { data, error } = await supabase
      .from('categoria')
      .select('*')
      .order('nome');
      
    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(payload: CategoryFormData): Promise<CategoriaRow> {
    const { data, error } = await supabase
      .from('categoria')
      .insert([payload])
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return data;
  },

  async update(id: string, payload: Partial<CategoryFormData>): Promise<CategoriaRow> {
    const { data, error } = await supabase
      .from('categoria')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw new Error(error.message);
    return data;
  },

  async toggleStatus(id: string, currentStatus: boolean): Promise<void> {
    const { error } = await supabase
      .from('categoria')
      .update({ ativo: !currentStatus })
      .eq('id', id);
      
    if (error) throw new Error(error.message);
  }
};