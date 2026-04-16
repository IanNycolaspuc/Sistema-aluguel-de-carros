import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer style={styles.footer}>
      
      <div style={styles.brand}>
        CIEL <span style={{ color: '#60a5fa' }}>Cars</span>
      </div>

      <span style={styles.copy}>
        © 2026 CIEL Cars. Todos os direitos reservados.
      </span>

      <div style={styles.links}>
        <span onClick={() => navigate('/sobre')} style={styles.link}>Sobre</span>
        <span onClick={() => navigate('/contatoEmail')} style={styles.link}>Contato</span>
      </div>

    </footer>
  )
}

const styles = {
  footer: {
    background: '#0f172a',
    color: '#9ca3af',
    padding: '20px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },

  brand: {
    fontWeight: '700',
    color: '#fff',
    fontSize: '16px'
  },

  copy: {
    fontSize: '13px'
  },

  links: {
    display: 'flex',
    gap: '16px'
  },

  link: {
    cursor: 'pointer',
    transition: '0.2s',
  }
}