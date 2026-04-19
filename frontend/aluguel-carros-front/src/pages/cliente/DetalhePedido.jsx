import { useEffect, useState } from 'react'
import { buscarPedidoPorId } from '../../service/clienteService'

export default function DetalhePedidoModal({ id, onClose }) {
  const [pedido, setPedido] = useState(null)

  useEffect(() => {
    if (!id) return

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

  if (!id) return null

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {!pedido ? (
          <p style={styles.loading}>Carregando...</p>
        ) : (
          <>
            <div style={styles.header}>
              <h2 style={styles.title}>Pedido #{pedido.id}</h2>
              <button onClick={onClose} style={styles.closeBtn}>✕</button>
            </div>

            <div
              style={{
                ...styles.status,
                ...getStatusStyle(pedido.status),
              }}
            >
              {pedido.status}
            </div>

            <div style={styles.content}>
              <p><strong>Data:</strong> {formatarData(pedido.dataSolicitacao)}</p>
              <p><strong>Valor:</strong> R$ {pedido.valorPrevisto}</p>
              <p><strong>Observações:</strong> {pedido.observacoes || 'Nenhuma'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },

  modal: {
    width: '100%',
    maxWidth: '500px',
    background: '#fff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
    animation: 'fadeIn 0.2s ease',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },

  title: {
    margin: 0,
    fontSize: '22px',
    fontWeight: 800,
    color: '#1a1a2e',
  },

  closeBtn: {
    border: 'none',
    background: 'transparent',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280',
  },

  status: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '15px',
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '14px',
    color: '#374151',
  },

  loading: {
    textAlign: 'center',
    color: '#6b7280',
  },
}