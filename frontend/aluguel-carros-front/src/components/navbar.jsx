import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                {/* Logo / Nome */}
                <span
                    className="navbar-brand"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/cliente/dashboard')}
                >
                    🚗 Sistema Aluguel CIEL
                </span>

                {/* Botões */}
                <div className="d-flex gap-2">

                    <button
                        className="btn btn-danger"
                        onClick={() => navigate('/')}
                    >
                        Sair
                    </button>
                </div>

            </div>
        </nav>
    )
}