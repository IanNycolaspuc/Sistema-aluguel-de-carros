import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarPedidos } from '../../service/agenteService'
import StatusBadge from '../../components/StatusBadge'

const STATUS_OPCOES = ['TODOS', 'PENDENTE', 'EM_ANALISE', 'APROVADO', 'REJEITADO', 'CANCELADO', 'CONVERTIDO_EM_CONTRATO']

export default function AgentePedidos() {
  const navigate = useNavigate()
  const [pedidos, setPedidos] = useState([])
  const [filtro, setFiltro] = useState('TODOS')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listarPedidos()
      .then((res) => setPedidos(res.data))
      .catch((err) => console.error('Erro ao listar pedidos:', err))
      .finally(() => setLoading(false))
  }, [])

  const pedidosFiltrados = filtro === 'TODOS'
    ? pedidos
    : pedidos.filter((p) => p.status === filtro)

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString('pt-BR') : '—'

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">🚗 CarRental — Agente</span>
      </nav>

      <div className="container py-4">
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate('/agente/dashboard')}
          >
            ← Voltar
          </button>
          <h4 className="mb-0">Pedidos de Aluguel</h4>
        </div>

        {/* Filtro por status */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {STATUS_OPCOES.map((s) => (
            <button
              key={s}
              className={`btn btn-sm ${filtro === s ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setFiltro(s)}
            >
              {s === 'TODOS' ? 'Todos' : <StatusBadge status={s} />}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status" />
            <p className="mt-2 text-muted small">Carregando pedidos...</p>
          </div>
        ) : pedidosFiltrados.length === 0 ? (
          <p className="text-muted">Nenhum pedido encontrado.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover bg-white rounded shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Cliente ID</th>
                  <th>Automóvel ID</th>
                  <th>Data Solicitação</th>
                  <th>Data Fim</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.clienteId}</td>
                    <td>{p.automovelId}</td>
                    <td>{formatarData(p.dataSolicitacao)}</td>
                    <td>{formatarData(p.dataFimPretendida)}</td>
                    <td>{p.valorPrevisto != null ? `R$ ${p.valorPrevisto}` : '—'}</td>
                    <td><StatusBadge status={p.status} /></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/agente/pedidos/${p.id}`)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
