import { useEffect } from 'react'
import { listarAutomoveis } from '../../service/clienteService'

export default function Automoveis() {

  useEffect(() => {
    listarAutomoveis()
      .then(res => {
        console.log('DADOS:', res.data)
      })
      .catch(err => {
        console.error('ERRO:', err)
      })
  }, [])

  return (
    <div>
      <h1>Teste Automóveis</h1>
    </div>
  )
}