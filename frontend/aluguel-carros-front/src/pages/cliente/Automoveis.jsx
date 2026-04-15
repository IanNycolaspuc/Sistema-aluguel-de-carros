import Navbar from '../../components/Navbar'
import { useEffect, useState } from 'react'
import { listarAutomoveis } from '../../service/clienteService'
import { criarPedido } from '../../service/clienteService'
import { useNavigate } from 'react-router-dom'

export default function Automoveis() {
    const [automoveis, setAutomoveis] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        listarAutomoveis()
            .then((response) => {
                setAutomoveis(response.data)
            })
            .catch((error) => {
                console.error('Erro ao buscar automóveis:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const handleAlugar = (automovelId) => {
        const pedido = {
            clienteId: 3, // depois vamos pegar do login
            automovelId: automovelId,
            dataFimPretendida: '2026-05-01T00:00:00',
            observacoes: 'Pedido criado pelo cliente'
        }

        criarPedido(pedido)
            .then(() => {
                alert('Pedido criado com sucesso!')
                navigate('/cliente/pedidos')
            })
            .catch((error) => {
                console.error('Erro ao criar pedido:', error)
            })
    }

    const navigate = useNavigate()

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status"></div>
                <p>Carregando automóveis...</p>
            </div>
        )
    }

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => navigate('/cliente/dashboard')}
                >
                    Voltar
                </button>

                <h1>Automóveis Disponíveis</h1>

                <div className="row">
                    {automoveis.map((carro) => (
                        <div key={carro.id} className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5>{carro.marca} {carro.modelo}</h5>
                                    <p>Ano: {carro.ano}</p>
                                    <p>Placa: {carro.placa}</p>
                                    <p>Status: {carro.status}</p>
                                    {/* Aqui você pode adicionar um botão para criar um pedido de aluguel */}
                                    <button
                                        onClick={() => handleAlugar(carro.id)}
                                        className="btn btn-primary"
                                    >
                                        Alugar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}