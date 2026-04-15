import { useEffect, useState } from 'react'
import { listarPedidosCliente, cancelarPedido } from '../../service/clienteService'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar'

export default function MeusPedidos() {
    const [pedidos, setPedidos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const clienteId = 3 // ⚠️ TEMPORÁRIO - aqui você deve pegar o ID do cliente logado, provavelmente do localStorage ou do contexto de autenticação

        listarPedidosCliente(clienteId)
            .then((response) => {
                setPedidos(response.data)
            })
            .catch((error) => {
                console.error('Erro ao buscar pedidos:', error)
            })
    }, [])

    const handleCancelar = (id) => {
        cancelarPedido(id)
            .then(() => {
                alert('Pedido cancelado com sucesso!')
                setPedidos((prev) =>
                    prev.map((p) =>
                        p.id === id ? { ...p, status: 'CANCELADO' } : p
                    )
                )
            })
            .catch((error) => {
                console.error('Erro ao cancelar pedido:', error)
            })
    }

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR')
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

                <h1>Meus Pedidos</h1>

                {pedidos.length === 0 ? (
                    <p>Nenhum pedido encontrado.</p>
                ) : (
                    <div className="row">
                        {pedidos.map((pedido) => (
                            <div key={pedido.id} className="col-md-4">
                                <div
                                    className="card mb-3"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/cliente/pedidos/${pedido.id}`)}
                                >
                                    <div className="card-body">
                                        <h5>Pedido #{pedido.id}</h5>
                                        <p>
                                            Status:{' '}
                                            <span
                                                style={{
                                                    color:
                                                        pedido.status === 'APROVADO'
                                                            ? 'green'
                                                            : pedido.status === 'PENDENTE'
                                                                ? 'orange'
                                                                : 'red'
                                                }}
                                            >
                                                {pedido.status}
                                            </span>
                                        </p>
                                        <p>Data: {formatarData(pedido.dataSolicitacao)}</p>
                                        <p>Valor: R$ {pedido.valorPrevisto}</p>

                                        {pedido.status === 'PENDENTE' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleCancelar(pedido.id)
                                                }}
                                                className="btn btn-danger"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}