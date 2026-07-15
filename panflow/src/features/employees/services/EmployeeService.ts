import { supabase } from '@/shared/database/supabaseClient';
import { Database } from '@/shared/database/types/database.types';
import { EmployeeFormData } from '../types/employeeSchema';

type FuncionarioRow = Database['public']['Tables']['funcionario']['Row'];

export const EmployeeService = {
  async getAll(): Promise<FuncionarioRow[]> {
    const { data, error } = await supabase
      .from('funcionario')
      .select('*')
      .order('nome');
      
    if (error) throw new Error(error.message);
    return data || [];
  },

  async create(payload: EmployeeFormData): Promise<void> {
    const { error } = await supabase
      .from('funcionario')
      .insert([payload]);
      
    if (error) throw new Error(error.message);
  },

  async update(id: string, payload: Partial<EmployeeFormData>): Promise<void> {
    const { error } = await supabase
      .from('funcionario')
      .update(payload)
      .eq('id', id);
      
    if (error) throw new Error(error.message);
  },

  async toggleStatus(id: string, currentStatus: boolean): Promise<void> {
    // Exclusão lógica: apenas inativa o funcionário
    const { error } = await supabase
      .from('funcionario')
      .update({ ativo: !currentStatus })
      .eq('id', id);
      
    if (error) throw new Error(error.message);
  }
};