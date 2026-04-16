import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarPedidoPorId } from '../../service/clienteService'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function DetalhePedido() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pedido, setPedido] = useState(null)

  useEffect(() => {
    buscarPedidoPorId(id)
      .then((response) => {
        setPedido(response.data)
      })
      .catch((error) => {
        console.error('Erro ao buscar pedido:', error)
      })
  }, [id])

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

  if (!pedido) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Carregando...
      </div>
    )
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
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <button
            onClick={() => navigate('/cliente/pedidos')}
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
            Detalhe do Pedido
          </h1>

          <div
            style={{
              background: '#fff',
              padding: '25px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ marginBottom: '15px' }}>
              Pedido #{pedido.id}
            </h3>

            <div
              style={{
                ...getStatusStyle(pedido.status),
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '15px'
              }}
            >
              {pedido.status}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p>
                <strong> Data:</strong> {formatarData(pedido.dataSolicitacao)}
              </p>

              <p>
                <strong> Valor:</strong> R$ {pedido.valorPrevisto}
              </p>

              <p>
                <strong> Observações:</strong>{' '}
                {pedido.observacoes || 'Nenhuma'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}