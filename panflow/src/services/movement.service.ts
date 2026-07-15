import { supabase } from '@/lib/supabase';
import { Movimento, EstoqueAtual } from '@/types/database';

export const MovementService = {
  async getEstoqueAtual(): Promise<EstoqueAtual[]> {
    const { data, error } = await supabase
      .from('vw_estoque_atual')
      .select('*');

    if (error) throw new Error(error.message);
    return data || [];
  },

  async register(movimento: Omit<Movimento, 'id' | 'created_at'>): Promise<Movimento> {
    const { data, error } = await supabase
      .from('movimentos')
      .insert([movimento])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};