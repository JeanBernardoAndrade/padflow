import { supabase } from './supabaseClient'
import { TipoMovimento } from '../database/types/database.types'

export interface CreateMovementDTO {
  produtoId: string
  tipoMovimento: TipoMovimento
  quantidade: number
  funcionarioId: string
  usuarioId: string
  motivo?: string
  observacao?: string
}

export const MovementService = {
  async register(movement: CreateMovementDTO): Promise<string> {
    // Executa a transação por trás da RPC, disparando validação RN005 de saldo
    const { data, error } = await supabase.rpc('rpc_registrar_movimento', {
      p_produto_id: movement.produtoId,
      p_tipo_movimento: movement.tipoMovimento,
      p_quantidade: movement.quantidade,
      p_funcionario_id: movement.funcionarioId,
      p_usuario_id: movement.usuarioId,
      p_motivo: movement.motivo || null,
      p_observacao: movement.observacao || null
    })

    if (error) throw new Error(error.message)
    return data
  }
}