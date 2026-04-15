import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { buscarPedidoPorId } from '../../service/clienteService'
import Navbar from '../../components/navbar'

export default function DetalhePedido() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pedido, setPedido] = useState(null)

    useEffect(() => {
        buscarPedidoPorId(id)
            .then((response) => {
                setPedido(response.data)
            })
            .catch((error) => {
                console.error('Erro ao buscar pedido:', error)
            })
    }, [id])

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR')
    }

    if (!pedido) {
        return <p>Carregando...</p>
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">

                <button
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => navigate('/cliente/pedidos')}
                >
                    Voltar
                </button>

                <h1>Detalhe do Pedido</h1>

                <div className="card mt-3">
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
                        <p>Observações: {pedido.observacoes || 'Nenhuma'}</p>
                    </div>
                </div>
            </div>
        </>
    )
}