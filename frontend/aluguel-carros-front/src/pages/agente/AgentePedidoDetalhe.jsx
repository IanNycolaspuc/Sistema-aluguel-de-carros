import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarPedido,
  analisarPedido,
  aprovarPedido,
  rejeitarPedido,
  converterContratoPedido,
} from "../../service/agenteService";
import StatusBadge from "../../components/StatusBadge";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AlertMensagem from "../../components/AlertMessage";

export default function AgentePedidoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState(null);
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    carregarPedido();
  }, [id]);

  function carregarPedido() {
    setLoading(true);
    buscarPedido(id)
      .then((res) => setPedido(res.data))
      .catch(() => setMensagem({ tipo: "error", texto: "Erro ao carregar pedido" }))
      .finally(() => setLoading(false));
  }

  async function executarAcao(acao, mensagemSucesso) {
    setProcessando(true);
    setMensagem(null);
    try {
      await acao();
      setMensagem({ tipo: "success", texto: mensagemSucesso });
      carregarPedido();
    } catch {
      setMensagem({ tipo: "error", texto: "Erro ao processar ação." });
    } finally {
      setProcessando(false);
    }
  }

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString("pt-BR") : "—";

  // Botões dinâmicos de acordo com o status atual do pedido
  function renderAcoes() {
    if (!pedido) return null;

    switch (pedido.status) {
      case "PENDENTE":
        return (
          <div style={styles.actions}>
            <button
              onClick={() => executarAcao(
                () => analisarPedido(id, usuario.id),
                "Pedido colocado em análise."
              )}
              disabled={processando}
              style={styles.analisarBtn}
            >
              {processando ? "Processando..." : "🔍 Em Análise"}
            </button>
            <button
              onClick={() => executarAcao(
                () => aprovarPedido(id, usuario.id),
                "Pedido aprovado com sucesso!"
              )}
              disabled={processando}
              style={styles.aprovarBtn}
            >
              {processando ? "Processando..." : "✓ Aprovar"}
            </button>
            <button
              onClick={() => executarAcao(
                () => rejeitarPedido(id, usuario.id),
                "Pedido rejeitado."
              )}
              disabled={processando}
              style={styles.rejeitarBtn}
            >
              {processando ? "Processando..." : "✗ Rejeitar"}
            </button>
          </div>
        );

      case "EM_ANALISE":
        return (
          <div style={styles.actions}>
            <button
              onClick={() => executarAcao(
                () => aprovarPedido(id, usuario.id),
                "Pedido aprovado com sucesso!"
              )}
              disabled={processando}
              style={styles.aprovarBtn}
            >
              {processando ? "Processando..." : "✓ Aprovar"}
            </button>
            <button
              onClick={() => executarAcao(
                () => rejeitarPedido(id, usuario.id),
                "Pedido rejeitado."
              )}
              disabled={processando}
              style={styles.rejeitarBtn}
            >
              {processando ? "Processando..." : "✗ Rejeitar"}
            </button>
          </div>
        );

      case "APROVADO":
        return (
          <div style={styles.actions}>
            <button
              onClick={() => executarAcao(
                () => converterContratoPedido(id, usuario.id),
                "Pedido convertido em contrato!"
              )}
              disabled={processando}
              style={styles.contratoBtn}
            >
              {processando ? "Processando..." : "📄 Converter em Contrato"}
            </button>
          </div>
        );

      // REJEITADO, CANCELADO, CONVERTIDO_EM_CONTRATO → sem ações
      default:
        return (
          <p style={styles.encerrado}>Este pedido está encerrado e não pode ser alterado.</p>
        );
    }
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>

          <button
            onClick={() => navigate("/agente/pedidos")}
            style={styles.backBtn}
          >
            ← Voltar
          </button>

          {loading ? (
            <p style={styles.loading}>Carregando pedido...</p>
          ) : !pedido ? (
            <p style={styles.error}>Pedido não encontrado.</p>
          ) : (
            <div style={styles.card}>

              <div style={styles.cardHeader}>
                <h2 style={styles.title}>Pedido #{pedido.id}</h2>
                <StatusBadge status={pedido.status} />
              </div>

              <div style={styles.infoGrid}>
                <Info label="Cliente ID" value={pedido.clienteId} />
                <Info label="Automóvel ID" value={pedido.automovelId} />
                <Info label="Data Solicitação" value={formatarData(pedido.dataSolicitacao)} />
                <Info label="Data Fim" value={formatarData(pedido.dataFimPretendida)} />
                <Info
                  label="Valor"
                  value={pedido.valorPrevisto != null ? `R$ ${pedido.valorPrevisto}` : "—"}
                />
                <Info label="Observações" value={pedido.observacoes || "Nenhuma"} />
                {pedido.agenteId && (
                  <Info label="Agente ID" value={pedido.agenteId} />
                )}
              </div>

              {renderAcoes()}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {mensagem && (
        <AlertMensagem
          type={mensagem.tipo}
          message={mensagem.texto}
          onClose={() => setMensagem(null)}
        />
      )}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <span style={styles.infoLabel}>{label}</span>
      <strong style={styles.infoValue}>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f9fafb",
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    background: "linear-gradient(135deg,#f1f5f9,#e0f2fe)",
  },

  container: {
    width: "100%",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  backBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    alignSelf: "flex-start",
  },

  loading: { textAlign: "center", color: "#6b7280" },
  error: { textAlign: "center", color: "#ef4444" },

  card: {
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: 0,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  infoBox: {
    background: "#f9fafb",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
  },

  infoLabel: { fontSize: "12px", color: "#6b7280" },
  infoValue: { fontSize: "14px", color: "#111827" },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  analisarBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#3b82f6,#2563eb)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: "140px",
  },

  aprovarBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: "140px",
  },

  rejeitarBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: "140px",
  },

  contratoBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    minWidth: "200px",
  },

  encerrado: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "13px",
    fontStyle: "italic",
  },
};
