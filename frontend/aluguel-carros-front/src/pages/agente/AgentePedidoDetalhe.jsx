import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  buscarPedido,
  analisarPedido,
  aprovarPedido,
  rejeitarPedido,
  converterContratoPedido,
  reverterPendente,
  reverterAnalise,
  reverterAprovado,
} from '../../service/agenteService'
import StatusBadge from '../../components/StatusBadge'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AlertMensagem from '../../components/AlertMessage'
import ConfirmacaoModal from '../../components/ConfirmacaoModal'

// Mapa de ações disponíveis por status
function getAcoes(status) {
  const cfg = {
    PENDENTE: [
      { id: 'analisar',         label: '🔍 Em Análise',           cor: '#3b82f6', labelObs: 'Observação (opcional)',    obsObrigatoria: false, tipo: 'acao'    },
      { id: 'aprovar',          label: '✓ Aprovar',               cor: '#22c55e', labelObs: 'Observação (opcional)',    obsObrigatoria: false, tipo: 'acao'    },
      { id: 'rejeitar',         label: '✗ Rejeitar',              cor: '#ef4444', labelObs: 'Motivo da rejeição',       obsObrigatoria: true,  tipo: 'acao'    },
    ],
    EM_ANALISE: [
      { id: 'aprovar',          label: '✓ Aprovar',               cor: '#22c55e', labelObs: 'Observação (opcional)',    obsObrigatoria: false, tipo: 'acao'    },
      { id: 'rejeitar',         label: '✗ Rejeitar',              cor: '#ef4444', labelObs: 'Motivo da rejeição',       obsObrigatoria: true,  tipo: 'acao'    },
      { id: 'reverter-pendente',label: '↩ Voltar para Pendente',  cor: '#9ca3af', labelObs: 'Motivo (opcional)',        obsObrigatoria: false, tipo: 'reverter'},
    ],
    APROVADO: [
      { id: 'converter-contrato', label: '📄 Converter em Contrato', cor: '#8b5cf6', labelObs: 'Observação (opcional)', obsObrigatoria: false, tipo: 'acao'    },
      { id: 'reverter-analise', label: '↩ Voltar para Em Análise', cor: '#9ca3af', labelObs: 'Motivo (opcional)',       obsObrigatoria: false, tipo: 'reverter'},
      { id: 'reverter-pendente',label: '↩ Voltar para Pendente',  cor: '#6b7280', labelObs: 'Motivo (opcional)',        obsObrigatoria: false, tipo: 'reverter'},
    ],
    REJEITADO: [
      { id: 'reverter-pendente',label: '↩ Reabrir Pedido',        cor: '#f59e0b', labelObs: 'Motivo da reabertura (opcional)', obsObrigatoria: false, tipo: 'reverter'},
    ],
    CONVERTIDO_EM_CONTRATO: [
      { id: 'reverter-aprovado',label: '↩ Voltar para Aprovado',  cor: '#9ca3af', labelObs: 'Motivo (opcional)',        obsObrigatoria: false, tipo: 'reverter'},
    ],
  }
  return cfg[status] || []
}

const serviceFns = {
  'analisar':           analisarPedido,
  'aprovar':            aprovarPedido,
  'rejeitar':           rejeitarPedido,
  'converter-contrato': converterContratoPedido,
  'reverter-pendente':  reverterPendente,
  'reverter-analise':   reverterAnalise,
  'reverter-aprovado':  reverterAprovado,
}

export default function AgentePedidoDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  const [pedido, setPedido]       = useState(null)
  const [loading, setLoading]     = useState(true)
  const [mensagem, setMensagem]   = useState(null)
  const [processando, setProcessando] = useState(false)
  const [modal, setModal]         = useState(null)

  useEffect(() => { carregarPedido() }, [id])

  function carregarPedido() {
    setLoading(true)
    buscarPedido(id)
      .then((res) => setPedido(res.data))
      .catch(() => setMensagem({ tipo: 'error', texto: 'Erro ao carregar pedido' }))
      .finally(() => setLoading(false))
  }

  async function confirmarAcao(obs) {
    const acaoAtual = modal
    setModal(null)
    setProcessando(true)
    setMensagem(null)
    try {
      await serviceFns[acaoAtual.acaoId](id, usuario.id, obs)
      setMensagem({ tipo: 'success', texto: 'Ação realizada com sucesso!' })
      carregarPedido()
    } catch {
      setMensagem({ tipo: 'error', texto: 'Erro ao processar ação.' })
    } finally {
      setProcessando(false)
    }
  }

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString('pt-BR') : '—'

  const acoes          = pedido ? getAcoes(pedido.status) : []
  const acoesPrincipais = acoes.filter((a) => a.tipo === 'acao')
  const acoesReverter  = acoes.filter((a) => a.tipo === 'reverter')

  return (
    <div style={sty.page}>
      <Header />

      <main style={sty.main}>
        <div style={sty.container}>

          <button onClick={() => navigate('/agente/pedidos')} style={sty.backBtn}>
            ← Voltar
          </button>

          {loading ? (
            <p style={sty.loading}>Carregando pedido...</p>
          ) : !pedido ? (
            <p style={sty.error}>Pedido não encontrado.</p>
          ) : (
            <div style={sty.card}>

              {/* Header do card */}
              <div style={sty.cardHeader}>
                <h2 style={sty.title}>Pedido #{pedido.id}</h2>
                <StatusBadge status={pedido.status} />
              </div>

              {/* Dados do pedido */}
              <div style={sty.infoGrid}>
                <Info label="Cliente ID"       value={pedido.clienteId} />
                <Info label="Automóvel ID"     value={pedido.automovelId} />
                <Info label="Data Solicitação" value={formatarData(pedido.dataSolicitacao)} />
                <Info label="Data Fim"         value={formatarData(pedido.dataFimPretendida)} />
                <Info label="Valor"            value={pedido.valorPrevisto != null ? `R$ ${pedido.valorPrevisto}` : '—'} />
                <Info label="Obs. do Cliente"  value={pedido.observacoes || 'Nenhuma'} />
              </div>

              {/* Observações do agente — exibidas se existirem */}
              {pedido.observacoesAgente && (
                <div style={sty.obsAgente}>
                  <span style={sty.obsAgenteLabel}>📝 Observações do Agente</span>
                  <p style={sty.obsAgenteTexto}>{pedido.observacoesAgente}</p>
                </div>
              )}

              {/* Ações principais */}
              {acoesPrincipais.length > 0 && (
                <div style={sty.section}>
                  <span style={sty.sectionLabel}>Ações</span>
                  <div style={sty.actions}>
                    {acoesPrincipais.map((acao) => (
                      <button
                        key={acao.id}
                        disabled={processando}
                        onClick={() => setModal({ acaoId: acao.id, ...acao })}
                        style={{ ...sty.btn, background: acao.cor }}
                      >
                        {acao.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reverter */}
              {acoesReverter.length > 0 && (
                <div style={sty.section}>
                  <span style={sty.sectionLabel}>Desfazer / Editar</span>
                  <div style={sty.actions}>
                    {acoesReverter.map((acao) => (
                      <button
                        key={acao.id}
                        disabled={processando}
                        onClick={() => setModal({ acaoId: acao.id, ...acao })}
                        style={{ ...sty.btn, ...sty.btnReverter }}
                      >
                        {acao.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {acoes.length === 0 && (
                <p style={sty.encerrado}>Este pedido está encerrado e não pode ser alterado.</p>
              )}

            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modal de confirmação */}
      {modal && (
        <ConfirmacaoModal
          aberto
          titulo={`Confirmar: ${modal.label}?`}
          descricao={`Pedido #${id} — esta ação poderá ser desfeita depois.`}
          labelObs={modal.labelObs}
          obsObrigatoria={modal.obsObrigatoria}
          corConfirmar={modal.cor}
          textoConfirmar="Confirmar"
          onConfirmar={confirmarAcao}
          onCancelar={() => setModal(null)}
        />
      )}

      {mensagem && (
        <AlertMensagem
          type={mensagem.tipo}
          message={mensagem.texto}
          onClose={() => setMensagem(null)}
        />
      )}
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div style={sty.infoBox}>
      <span style={sty.infoLabel}>{label}</span>
      <strong style={sty.infoValue}>{value}</strong>
    </div>
  )
}

const sty = {
  page:          { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' },
  main:          { flex: 1, display: 'flex', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(135deg,#f1f5f9,#e0f2fe)' },
  container:     { width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '20px' },
  backBtn:       { padding: '8px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontWeight: 600, alignSelf: 'flex-start' },
  loading:       { textAlign: 'center', color: '#6b7280' },
  error:         { textAlign: 'center', color: '#ef4444' },
  card:          { background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '20px' },
  cardHeader:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title:         { fontSize: '20px', fontWeight: 800, color: '#1a1a2e', margin: 0 },
  infoGrid:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  infoBox:       { background: '#f9fafb', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' },
  infoLabel:     { fontSize: '12px', color: '#6b7280' },
  infoValue:     { fontSize: '14px', color: '#111827' },
  obsAgente:     { background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' },
  obsAgenteLabel:{ fontSize: '12px', fontWeight: 700, color: '#92400e' },
  obsAgenteTexto:{ fontSize: '14px', color: '#78350f', margin: 0 },
  section:       { display: 'flex', flexDirection: 'column', gap: '10px' },
  sectionLabel:  { fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' },
  actions:       { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  btn:           { flex: 1, minWidth: '140px', padding: '12px', borderRadius: '10px', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '14px' },
  btnReverter:   { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' },
  encerrado:     { textAlign: 'center', color: '#9ca3af', fontSize: '13px', fontStyle: 'italic' },
}
