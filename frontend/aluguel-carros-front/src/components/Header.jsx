import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  function handleLogout() {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        CIEL <span style={{ color: '#60a5fa' }}>Cars</span>
      </div>

      <div style={styles.right}>
        {usuario ? (
          <>
            <span style={styles.user}>
              Olá, {usuario.nome.split(' ')[0]}
            </span>

            {/* 👇 CLIENTE */}
            {usuario.tipoUsuario === 'CLIENTE' && (
              <>
                <button
                  onClick={() => navigate('/cliente/pedidos')}
                  style={styles.navBtn}
                >
                  Meus Pedidos
                </button>

                <button
                  onClick={() => navigate('/cliente/perfil')}
                  style={styles.navBtn}
                >
                  Meus Dados
                </button>
              </>
            )}

            {/* 👇 AGENTE */}
            {usuario.tipoUsuario === 'AGENTE' && (
              <button
                onClick={() => navigate('/agente/dashboard')}
                style={styles.navBtn}
              >
                Dashboard
              </button>
            )}

            <button onClick={handleLogout} style={styles.logout}>
              Sair
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.login}>
            Entrar
          </button>
        )}
      </div>
    </header>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #0f172a, #185FA5)',
    padding: '0 2rem',
    height: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  },

  logo: {
    fontSize: '22px',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },

  user: {
    fontSize: '14px',
    opacity: 0.9
  },

  navBtn: {
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: '0.2s',
  },

  login: {
    background: '#fff',
    color: '#185FA5',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer'
  },

  logout: {
    background: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.4)',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer'
  }
}