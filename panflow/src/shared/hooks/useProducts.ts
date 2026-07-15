import { useState, useEffect, useCallback } from 'react'
import { ProductService } from '../services/ProductService'
import { Database } from '../database/types/database.types'

type EstoqueRow = Database['public']['Views']['vw_estoque_atual']['Row']

export function useProducts(search = '', categoria = '') {
  const [stock, setStock] = useState<EstoqueRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStock = useCallback(async () => {
    try {
      setLoading(true)
      const data = await ProductService.getStockList(search, categoria)
      setStock(data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar lista de estoque.')
    } finally {
      setLoading(false)
    }
  }, [search, categoria])

  useEffect(() => {
    fetchStock()
  }, [fetchStock])

  return { stock, loading, error, refetch: fetchStock }
}