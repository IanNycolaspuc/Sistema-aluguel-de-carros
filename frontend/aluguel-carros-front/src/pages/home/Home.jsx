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
    // Navega para a tela de pedido passando o carro selecionado
    navigate('/cliente/pedido-aluguel', { state: { automovelSelecionado: carro } })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <Header />

      <main style={{ flex: 1, padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>
            Encontre o carro ideal para sua viagem
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            {usuario
              ? 'Selecione um veículo disponível e faça sua reserva.'
              : 'Faça login para reservar um veículo.'}
          </p>
        </div>

        {loading && (
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Carregando veículos...</p>
        )}

        {erro && (
          <div style={{
            background: '#FCEBEB', color: '#A32D2D',
            padding: '12px 16px', borderRadius: '8px', fontSize: '14px'
          }}>
            {erro}
          </div>
        )}

        {!loading && !erro && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}>
            {carros.map(carro => {
              const s = statusConfig[carro.status] || statusConfig.DISPONIVEL
              const disponivel = carro.status === 'DISPONIVEL'

              return (
                <div key={carro.id} style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {/* Imagem / ícone */}
                  <div style={{
                    height: '110px',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                  }}>
                    🚗
                  </div>

                  {/* Corpo */}
                  <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>
                      {carro.marca} {carro.modelo}
                    </div>
                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                      {carro.ano} · {carro.placa} · {carro.matricula}
                    </div>

                    <span style={{
                      alignSelf: 'flex-start',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '4px',
                      background: s.bg,
                      color: s.color,
                    }}>
                      {s.label}
                    </span>

                    {/* Botão alugar */}
                    <button
                      onClick={() => handleAlugar(carro)}
                      disabled={!disponivel}
                      style={{
                        marginTop: 'auto',
                        paddingTop: '10px',
                        width: '100%',
                        padding: '9px',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: disponivel ? 'pointer' : 'not-allowed',
                        background: disponivel ? '#185FA5' : '#e5e7eb',
                        color: disponivel ? '#fff' : '#9ca3af',
                        transition: 'background 0.15s',
                      }}
                    >
                      {disponivel ? 'Alugar' : 'Indisponível'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}