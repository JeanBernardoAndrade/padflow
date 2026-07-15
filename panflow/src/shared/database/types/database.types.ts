export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type TipoMovimento = 'PRODUCAO' | 'VENDA' | 'CONSUMO' | 'PERDA' | 'AJUSTE'
export type RoleUsuario = 'ADMIN' | 'GERENTE' | 'OPERADOR'

export interface Database {
  public: {
    Tables: {
      categoria: {
        Row: {
          id: string
          nome: string
          descricao: string | null
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          descricao?: string | null
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      produto: {
        Row: {
          id: string
          categoria_id: string
          codigo: string | null
          nome: string
          descricao: string | null
          preco_venda: number
          custo_unitario: number
          estoque_minimo: number
          controla_estoque: boolean
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          categoria_id: string
          codigo?: string | null
          nome: string
          descricao?: string | null
          preco_venda: number
          custo_unitario: number
          estoque_minimo?: number
          controla_estoque?: boolean
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      funcionario: {
        Row: {
          id: string
          nome: string
          cargo: string
          ativo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          cargo: string
          ativo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      usuario: {
        Row: {
          id: string
          auth_user_id: string | null
          nome: string
          email: string
          role: RoleUsuario
          ativo: boolean
          created_at: string
        }
      }
      movimento: {
        Row: {
          id: string
          produto_id: string
          tipo_movimento: TipoMovimento
          quantidade: number
          funcionario_id: string
          motivo: string | null
          observacao: string | null
          data_movimento: string
          usuario_id: string
          created_at: string
        }
      }
    }
    Views: {
      vw_estoque_atual: {
        Row: {
          produto_id: string
          produto_codigo: string | null
          produto_nome: string
          categoria_nome: string
          preco_venda: number
          custo_unitario: number
          estoque_minimo: number
          controla_estoque: boolean
          total_produzido: number
          total_vendido: number
          total_consumido: number
          total_perdido: number
          total_ajustado: number
          saldo: number
        }
      }
      vw_dashboard: {
        Row: {
          producao_hoje: number
          venda_volume_hoje: number
          venda_valor_hoje: number
          consumo_hoje: number
          perda_volume_hoje: number
          perda_custo_hoje: number
          itens_abaixo_minimo: number
        }
      }
    }
    Functions: {
      rpc_registrar_movimento: {
        Args: {
          p_produto_id: string
          p_tipo_movimento: TipoMovimento
          p_quantidade: number
          p_funcionario_id: string
          p_usuario_id: string
          p_motivo?: string
          p_observacao?: string
        }
        Returns: string
      }
    }
  }
}