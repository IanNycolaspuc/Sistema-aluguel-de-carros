import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  function handleLogout() {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 2rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
      >
        <span style={{ fontSize: '20px', fontWeight: 700 }}>
          Car<span style={{ color: '#185FA5' }}>Rental</span>
        </span>
      </div>

      <div>
        {usuario ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Olá, {usuario.nome.split(' ')[0]}</span>
            <button onClick={handleLogout} style={btnStyle}>Sair</button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} style={btnStyle}>Entrar</button>
        )}
      </div>
    </header>
  )
}

const btnStyle = {
  border: '1px solid #d1d5db',
  background: 'transparent',
  padding: '7px 18px',
  borderRadius: '8px',
  fontSize: '13px',
  cursor: 'pointer',
}