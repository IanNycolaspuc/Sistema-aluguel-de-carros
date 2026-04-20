import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  buscarPedido,
  aprovarPedido,
  rejeitarPedido,
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

  async function handleAprovar() {
    setProcessando(true);
    try {
      await aprovarPedido(id, usuario.id);
      setMensagem({ tipo: "success", texto: "Pedido aprovado com sucesso!" });
      carregarPedido();
    } catch {
      setMensagem({ tipo: "error", texto: "Erro ao aprovar pedido." });
    } finally {
      setProcessando(false);
    }
  }

  async function handleRejeitar() {
    setProcessando(true);
    try {
      await rejeitarPedido(id, usuario.id);
      setMensagem({ tipo: "warning", texto: "Pedido rejeitado." });
      carregarPedido();
    } catch {
      setMensagem({ tipo: "error", texto: "Erro ao rejeitar pedido." });
    } finally {
      setProcessando(false);
    }
  }

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString("pt-BR") : "—";

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>

          {/* BOTÃO VOLTAR */}
          <button
            onClick={() => navigate("/agente/pedidos")}
            style={styles.backBtn}
          >
            ← Voltar
          </button>

          {/* LOADING */}
          {loading ? (
            <p style={styles.loading}>Carregando pedido...</p>
          ) : !pedido ? (
            <p style={styles.error}>Pedido não encontrado.</p>
          ) : (
            <div style={styles.card}>
              
              {/* HEADER DO CARD */}
              <div style={styles.cardHeader}>
                <h2 style={styles.title}>Pedido #{pedido.id}</h2>
                <StatusBadge status={pedido.status} />
              </div>

              {/* INFOS */}
              <div style={styles.infoGrid}>
                <Info label="Cliente ID" value={pedido.clienteId} />
                <Info label="Automóvel ID" value={pedido.automovelId} />
                <Info label="Data Solicitação" value={formatarData(pedido.dataSolicitacao)} />
                <Info label="Data Fim" value={formatarData(pedido.dataFimPretendida)} />
                <Info
                  label="Valor"
                  value={
                    pedido.valorPrevisto != null
                      ? `R$ ${pedido.valorPrevisto}`
                      : "—"
                  }
                />
                <Info
                  label="Observações"
                  value={pedido.observacoes || "Nenhuma"}
                />

                {pedido.agenteId && (
                  <Info label="Agente ID" value={pedido.agenteId} />
                )}
              </div>

              {/* AÇÕES */}
              {pedido.status === "PENDENTE" && (
                <div style={styles.actions}>
                  <button
                    onClick={handleAprovar}
                    disabled={processando}
                    style={styles.aprovarBtn}
                  >
                    {processando ? "Processando..." : "✓ Aprovar"}
                  </button>

                  <button
                    onClick={handleRejeitar}
                    disabled={processando}
                    style={styles.rejeitarBtn}
                  >
                    {processando ? "Processando..." : "✗ Rejeitar"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* ALERT GLOBAL */}
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

/* COMPONENTE AUXILIAR */
function Info({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <span style={styles.infoLabel}>{label}</span>
      <strong style={styles.infoValue}>{value}</strong>
    </div>
  );
}

/* STYLES */
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

  loading: {
    textAlign: "center",
    color: "#6b7280",
  },

  error: {
    textAlign: "center",
    color: "#ef4444",
  },

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

  infoLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },

  infoValue: {
    fontSize: "14px",
    color: "#111827",
  },

  actions: {
    display: "flex",
    gap: "12px",
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
  },
};