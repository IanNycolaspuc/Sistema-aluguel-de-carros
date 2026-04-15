export default function Footer() {
  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      padding: '1.25rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
    }}>
      <span style={{ fontSize: '12px', color: '#9ca3af' }}>
        © 2026 ECIL Car. Todos os direitos reservados.
      </span>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="#" style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'none' }}>Sobre</a>
        <a href="#" style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'none' }}>Contato</a>
      </div>
    </footer>
  )
}