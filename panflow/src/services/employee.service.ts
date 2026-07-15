import { supabase } from '@/lib/supabase';
import { Funcionario } from '@/types/database';

export const EmployeeService = {
  async getAll(): Promise<Funcionario[]> {
    const { data, error } = await supabase
      .from('funcionarios')
      .select('*')
      .order('nome', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(funcionario: Omit<Funcionario, 'id' | 'created_at'>): Promise<Funcionario> {
    const { data, error } = await supabase
      .from('funcionarios')
      .insert([funcionario])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};