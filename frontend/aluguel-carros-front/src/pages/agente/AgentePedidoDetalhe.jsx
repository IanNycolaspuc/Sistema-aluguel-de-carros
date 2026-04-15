import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarPedido, aprovarPedido, rejeitarPedido } from '../../service/agenteService'
import StatusBadge from '../../components/StatusBadge'

export default function AgentePedidoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  const [pedido, setPedido] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mensagem, setMensagem] = useState(null) // { tipo: 'success'|'danger', texto }
  const [processando, setProcessando] = useState(false)

  useEffect(() => {
    carregarPedido()
  }, [id])

  function carregarPedido() {
    setLoading(true)
    buscarPedido(id)
      .then((res) => setPedido(res.data))
      .catch((err) => console.error('Erro ao buscar pedido:', err))
      .finally(() => setLoading(false))
  }

  async function handleAprovar() {
    setProcessando(true)
    try {
      await aprovarPedido(id, usuario.id)
      setMensagem({ tipo: 'success', texto: 'Pedido aprovado com sucesso!' })
      carregarPedido()
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: 'Erro ao aprovar pedido.' })
    } finally {
      setProcessando(false)
    }
  }

  async function handleRejeitar() {
    setProcessando(true)
    try {
      await rejeitarPedido(id, usuario.id)
      setMensagem({ tipo: 'success', texto: 'Pedido rejeitado.' })
      carregarPedido()
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: 'Erro ao rejeitar pedido.' })
    } finally {
      setProcessando(false)
    }
  }

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString('pt-BR') : '—'

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">🚗 CarRental — Agente</span>
      </nav>

      <div className="container py-4" style={{ maxWidth: '640px' }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate('/agente/pedidos')}
          >
            ← Voltar
          </button>
          <h4 className="mb-0">Detalhe do Pedido</h4>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status" />
          </div>
        ) : !pedido ? (
          <p className="text-danger">Pedido não encontrado.</p>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h5 className="card-title mb-0">Pedido #{pedido.id}</h5>
                <StatusBadge status={pedido.status} />
              </div>

              <table className="table table-sm table-borderless mb-3">
                <tbody>
                  <tr>
                    <th className="text-muted" style={{ width: '45%' }}>Cliente ID</th>
                    <td>{pedido.clienteId}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Automóvel ID</th>
                    <td>{pedido.automovelId}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Data de Solicitação</th>
                    <td>{formatarData(pedido.dataSolicitacao)}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Data Fim Pretendida</th>
                    <td>{formatarData(pedido.dataFimPretendida)}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Valor Previsto</th>
                    <td>{pedido.valorPrevisto != null ? `R$ ${pedido.valorPrevisto}` : '—'}</td>
                  </tr>
                  <tr>
                    <th className="text-muted">Observações</th>
                    <td>{pedido.observacoes || 'Nenhuma'}</td>
                  </tr>
                  {pedido.agenteId && (
                    <tr>
                      <th className="text-muted">Agente Responsável (ID)</th>
                      <td>{pedido.agenteId}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mensagem de feedback */}
              {mensagem && (
                <div className={`alert alert-${mensagem.tipo} py-2`}>
                  {mensagem.texto}
                </div>
              )}

              {/* Botões de ação — só aparecem se PENDENTE */}
              {pedido.status === 'PENDENTE' && (
                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-success"
                    onClick={handleAprovar}
                    disabled={processando}
                  >
                    {processando ? 'Processando...' : '✓ Aprovar'}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleRejeitar}
                    disabled={processando}
                  >
                    {processando ? 'Processando...' : '✗ Rejeitar'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
