import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPedidos } from "../../service/agenteService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AgenteDashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [totais, setTotais] = useState(null);

  useEffect(() => {
    listarPedidos()
      .then((res) => {
        const pedidos = res.data;
        setTotais({
          total: pedidos.length,
          pendente: pedidos.filter((p) => p.status === "PENDENTE").length,
          aprovado: pedidos.filter((p) => p.status === "APROVADO").length,
          rejeitado: pedidos.filter((p) => p.status === "REJEITADO").length,
          cancelado: pedidos.filter((p) => p.status === "CANCELADO").length,
        });
      })
      .catch((err) => console.error("Erro ao carregar pedidos:", err));
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>
          
          {/* Topo */}
          <div style={styles.top}>
            <div>
              <h1 style={styles.title}>Dashboard</h1>
              <p style={styles.subtitle}>
                Olá, {usuario?.nome?.split(" ")[0]} 
              </p>
            </div>

            <button onClick={handleLogout} style={styles.logout}>
              Sair
            </button>
          </div>

          {/* Cards */}
          {!totais ? (
            <p style={styles.loading}>Carregando...</p>
          ) : (
            <div style={styles.grid}>
              <Card title="Total" value={totais.total} />
              <Card title="Pendentes" value={totais.pendente} type="warning" />
              <Card title="Aprovados" value={totais.aprovado} type="success" />
              <Card title="Rejeitados" value={totais.rejeitado} type="danger" />
              <Card title="Cancelados" value={totais.cancelado} type="neutral" />
            </div>
          )}

          {/* Ação */}
          <button
            onClick={() => navigate("/agente/pedidos")}
            style={styles.button}
          >
            Ver todos os pedidos
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* 🔥 Card reutilizável */
function Card({ title, value, type = "default" }) {
  const colors = {
    default: "#1a1a2e",
    warning: "#f59e0b",
    success: "#22c55e",
    danger: "#ef4444",
    neutral: "#6b7280",
  };

  return (
    <div style={styles.card}>
      <span style={styles.cardLabel}>{title}</span>
      <strong style={{ ...styles.cardValue, color: colors[type] }}>
        {value}
      </strong>
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
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: 0,
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },

  logout: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },

  loading: {
    textAlign: "center",
    color: "#6b7280",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  cardLabel: {
    fontSize: "13px",
    color: "#6b7280",
  },

  cardValue: {
    fontSize: "28px",
    fontWeight: 800,
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 10px 25px rgba(245,158,11,0.35)",
  },
};