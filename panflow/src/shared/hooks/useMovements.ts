import { useState } from 'react'
import { MovementService, CreateMovementDTO } from '../services/MovementService'

export function useMovements() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const registerMovement = async (dto: CreateMovementDTO) => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)
    try {
      await MovementService.register(dto)
      setSuccess(true)
      return true
    } catch (err: any) {
      setError(err.message || 'Erro de integridade ao registrar fluxo de estoque.')
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return { registerMovement, submitting, error, success }
}