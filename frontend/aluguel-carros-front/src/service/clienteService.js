import api from './api'

// automóveis
export const listarAutomoveis = () =>
  api.get('/automoveis/disponiveis')

// pedidos
export const criarPedido = (data) =>
  api.post('/pedidos', data)

export const listarPedidosCliente = (clienteId) =>
  api.get(`/pedidos/cliente/${clienteId}`)

export const cancelarPedido = (id) =>
  api.put(`/pedidos/${id}/cancelar`)