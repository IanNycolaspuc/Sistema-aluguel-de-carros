import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'

export default function ClienteDashboard() {
  const navigate = useNavigate()

  return (

    <>
      <Navbar />
      <div className="container mt-4">
        <h1>Dashboard do Cliente</h1>
        <p>Bem-vindo, cliente!</p>

        <div className="mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate('/cliente/automoveis')}
          >
            Ver Automóveis
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/cliente/pedidos')}
          >
            Meus Pedidos
          </button>
        </div>
      </div>
    </>
  )
}