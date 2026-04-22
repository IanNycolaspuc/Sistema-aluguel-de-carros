import api from './api_temp.js'

export const listarPedidos = () =>
  api.get('/pedidos')

export const buscarPedido = (id) =>
  api.get(`/pedidos/${id}`)

// ── Ações principais ────────────────────────────────────────────────────────

export const analisarPedido = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/analisar?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)

export const aprovarPedido = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/aprovar?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)

export const rejeitarPedido = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/rejeitar?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)

export const converterContratoPedido = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/converter-contrato?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)

// ── Reverter / Desfazer ─────────────────────────────────────────────────────

export const reverterPendente = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/reverter-pendente?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)

export const reverterAnalise = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/reverter-analise?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)

export const reverterAprovado = (id, agenteId, obs = '') =>
  api.put(`/pedidos/${id}/reverter-aprovado?agenteId=${agenteId}&observacoesAgente=${encodeURIComponent(obs)}`)
