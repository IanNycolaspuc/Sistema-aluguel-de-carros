import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarPedidos } from '../../service/agenteService'

export default function AgenteDashboard() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
  const [totais, setTotais] = useState(null)

  useEffect(() => {
    listarPedidos()
      .then((res) => {
        const pedidos = res.data
        setTotais({
          total:     pedidos.length,
          pendente:  pedidos.filter((p) => p.status === 'PENDENTE').length,
          aprovado:  pedidos.filter((p) => p.status === 'APROVADO').length,
          rejeitado: pedidos.filter((p) => p.status === 'REJEITADO').length,
          cancelado: pedidos.filter((p) => p.status === 'CANCELADO').length,
        })
      })
      .catch((err) => console.error('Erro ao carregar pedidos:', err))
  }, [])

  function handleLogout() {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">🚗 CarRental — Agente</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white-50" style={{ fontSize: '14px' }}>
            Olá, {usuario?.nome?.split(' ')[0]}
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <h4 className="mb-4">Dashboard</h4>

        {/* Cards de totais */}
        {totais ? (
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="card text-center h-100">
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 700 }}>{totais.total}</div>
                  <div className="text-muted small">Total de Pedidos</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-warning">
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#856404' }}>{totais.pendente}</div>
                  <div className="text-muted small">Pendentes</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-success">
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#155724' }}>{totais.aprovado}</div>
                  <div className="text-muted small">Aprovados</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card text-center h-100 border-danger">
                <div className="card-body">
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#721c24' }}>{totais.rejeitado}</div>
                  <div className="text-muted small">Rejeitados</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="spinner-border text-secondary" role="status" />
            <p className="mt-2 text-muted small">Carregando...</p>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={() => navigate('/agente/pedidos')}
        >
          Ver todos os pedidos
        </button>
      </div>
    </div>
  )
}
