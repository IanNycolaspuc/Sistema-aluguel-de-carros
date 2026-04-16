import { useEffect, useState } from 'react'
import { listarPedidosCliente, cancelarPedido } from '../../service/clienteService'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const clienteId = usuario?.id

    listarPedidosCliente(clienteId)
      .then((response) => {
        setPedidos(response.data)
      })
      .catch((error) => {
        console.error('Erro ao buscar pedidos:', error)
      })
  }, [])

  const handleCancelar = (id) => {
    cancelarPedido(id)
      .then(() => {
        alert('Pedido cancelado com sucesso!')
        setPedidos((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: 'CANCELADO' } : p
          )
        )
      })
      .catch((error) => {
        console.error('Erro ao cancelar pedido:', error)
      })
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'APROVADO':
        return { background: '#dcfce7', color: '#166534' }
      case 'PENDENTE':
        return { background: '#fef9c3', color: '#854d0e' }
      case 'CANCELADO':
        return { background: '#fee2e2', color: '#991b1b' }
      default:
        return {}
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main
        style={{
          flex: 1,
          padding: '40px 16px',
          background: 'linear-gradient(135deg, #f1f5f9, #e0f2fe)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <button
            onClick={() => navigate('/')}
            style={{
              marginBottom: '20px',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #d1d5db',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            ← Voltar
          </button>

          <h1 style={{ marginBottom: '20px', color: '#185FA5' }}>
            Meus Pedidos
          </h1>

          {pedidos.length === 0 ? (
            <p style={{ color: '#6b7280' }}>
              Nenhum pedido encontrado.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  onClick={() => navigate(`/cliente/pedidos/${pedido.id}`)}
                  style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'translateY(-4px)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'translateY(0)')
                  }
                >
                  <h4 style={{ marginBottom: '10px' }}>
                    Pedido #{pedido.id}
                  </h4>

                  <div
                    style={{
                      ...getStatusStyle(pedido.status),
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '10px'
                    }}
                  >
                    {pedido.status}
                  </div>

                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    Data: {formatarData(pedido.dataSolicitacao)}
                  </p>

                  <p style={{ fontWeight: '600', marginTop: '5px' }}>
                    R$ {pedido.valorPrevisto}
                  </p>

                  {pedido.status === 'PENDENTE' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCancelar(pedido.id)
                      }}
                      style={{
                        marginTop: '12px',
                        padding: '8px',
                        width: '100%',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#ef4444',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Cancelar Pedido
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}