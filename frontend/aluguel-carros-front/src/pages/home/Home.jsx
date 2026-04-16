import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

const statusConfig = {
  DISPONIVEL: { label: 'Disponível', color: '#3B6D11', bg: '#EAF3DE' },
  ALUGADO:    { label: 'Alugado',    color: '#854F0B', bg: '#FAEEDA' },
  MANUTENCAO: { label: 'Manutenção', color: '#A32D2D', bg: '#FCEBEB' },
}

export default function Home() {
  const navigate = useNavigate()
  const [carros, setCarros] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  useEffect(() => {
    fetch('http://localhost:8080/automoveis')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar automóveis')
        return res.json()
      })
      .then(data => setCarros(data))
      .catch(err => setErro(err.message))
      .finally(() => setLoading(false))
  }, [])

  function handleAlugar(carro) {
    if (!usuario) {
      navigate('/login')
      return
    }
    navigate('/cliente/pedido-aluguel', { state: { automovelSelecionado: carro } })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <Header />

      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px 16px',
        background: 'linear-gradient(135deg, #f1f5f9, #e0f2fe)',
      }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>

          {/* Cabeçalho */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827' }}>
              Encontre o carro ideal!
            </h1>
            <p style={{ color: '#6b7280', marginTop: '8px', fontSize: '14px' }}>
              {usuario
                ? 'Escolha um veículo e comece sua viagem'
                : 'Faça login para alugar um veículo'}
            </p>
          </div>

          {loading && <p style={{ color: '#6b7280' }}>Carregando...</p>}

          {erro && (
            <div style={{
              background: '#FCEBEB',
              color: '#A32D2D',
              padding: '12px 14px',
              borderRadius: '12px',
              fontSize: '14px',
            }}>
              {erro}
            </div>
          )}

          {!loading && !erro && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              {carros.map(carro => {
                const s = statusConfig[carro.status] || statusConfig.DISPONIVEL
                const disponivel = carro.status === 'DISPONIVEL'

                return (
                  <div key={carro.id} style={styles.card}>

                    {/* Imagem */}
                    <div style={styles.image}>carExemplo</div>

                    {/* Conteúdo */}
                    <div style={styles.content}>
                      <div>
                        <h3 style={styles.title}>{carro.marca} {carro.modelo}</h3>
                        <p style={styles.subtitle}>{carro.ano} • {carro.placa}</p>
                      </div>

                      <div style={styles.price}>
                        R$ {Number(carro.valorDiaria).toFixed(2)}
                        <span style={styles.perDay}> / dia</span>
                      </div>

                      <span style={{
                        ...styles.badge,
                        background: s.bg,
                        color: s.color,
                      }}>
                        {s.label}
                      </span>

                      <button
                        onClick={() => handleAlugar(carro)}
                        disabled={!disponivel}
                        style={{
                          ...styles.button,
                          background: disponivel ? '#185FA5' : '#e5e7eb',
                          color: disponivel ? '#fff' : '#9ca3af',
                          cursor: disponivel ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {disponivel ? 'Alugar agora' : 'Indisponível'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: '0.2s',
  },

  image: {
    height: '140px',
    background: 'linear-gradient(135deg, #e0f2fe, #f1f5f9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '60px',
  },

  content: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
  },

  subtitle: {
    fontSize: '13px',
    color: '#9ca3af',
    marginTop: '2px',
  },

  price: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#185FA5',
  },

  perDay: {
    fontSize: '13px',
    color: '#6b7280',
    fontWeight: '400',
  },

  badge: {
    alignSelf: 'flex-start',
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '8px',
  },

  button: {
    marginTop: 'auto',
    padding: '11px',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    fontSize: '14px',
    transition: '0.2s',
  },
}