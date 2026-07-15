import { supabase } from '@/shared/database/supabaseClient';
import { CreateMovementDTO } from '@/shared/database/types/movement.types';

export const MovementService = {
  async register(payload: CreateMovementDTO): Promise<string> {
    const { data, error } = await supabase.rpc('rpc_registrar_movimento', {
      p_produto_id: payload.produto_id,
      p_natureza: payload.natureza,
      p_tipo_movimento: payload.tipo_movimento,
      p_quantidade: payload.quantidade,
      p_funcionario_id: payload.funcionario_id,
      p_usuario_id: payload.usuario_id,
      p_motivo: payload.motivo || null,
      p_observacao: payload.observacao || null
    });

    if (error) {
      // Interceptamos o erro lançado pelo RAISE EXCEPTION do banco (ex: RN308)
      throw new Error(error.message);
    }
    
    // Retorna o UUID do movimento gerado
    return data;
  },

  async getHistory(limit = 50) {
    const { data, error } = await supabase
      .from('movimento')
      .select(`
        *,
        produto ( nome ),
        funcionario ( nome )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data;
  }
};