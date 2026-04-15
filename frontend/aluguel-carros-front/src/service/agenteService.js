import api from './api_temp.js'

export const listarPedidos = () =>
  api.get('/pedidos')

export const buscarPedido = (id) =>
  api.get(`/pedidos/${id}`)

export const aprovarPedido = (id, agenteId) =>
  api.put(`/pedidos/${id}/aprovar?agenteId=${agenteId}`)

export const rejeitarPedido = (id, agenteId) =>
  api.put(`/pedidos/${id}/rejeitar?agenteId=${agenteId}`)
