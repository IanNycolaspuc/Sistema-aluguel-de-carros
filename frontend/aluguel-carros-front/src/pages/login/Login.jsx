import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../service/authService'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const resposta = await login(email, senha)
        
      //salvando o usuário logado no local storage 
      localStorage.setItem('usuarioLogado', JSON.stringify(resposta))
      

      if (resposta.tipoUsuario === 'CLIENTE') {
        navigate('/cliente/dashboard')
      } else if (resposta.tipoUsuario === 'AGENTE') {
        navigate('/agente/dashboard')
      } else {
        setErro('Tipo de usuário inválido.')
      }
    } catch (error) {
      console.log(error)
      setErro('Email ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  // function logout() {
  //   localStorage.removeItem('usuarioLogado')
  //   window.location.href = '/'
  // }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {erro && (
            <div className="alert alert-danger py-2 text-center">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}