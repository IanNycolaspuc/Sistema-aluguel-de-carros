import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { listarAutomoveis, criarPedido } from "../../service/clienteService";
import { useNavigate } from "react-router-dom";

export default function Automoveis() {
  const [automoveis, setAutomoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    listarAutomoveis()
      .then((response) => setAutomoveis(response.data))
      .catch((error) => console.error("Erro ao buscar automóveis:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleAlugar = (automovelId) => {
    const pedido = {
      clienteId: 3,
      automovelId,
      dataFimPretendida: "2026-05-01T00:00:00",
      observacoes: "Pedido criado pelo cliente",
    };

    criarPedido(pedido)
      .then(() => {
        alert("Pedido criado com sucesso!");
        navigate("/cliente/pedidos");
      })
      .catch((error) => console.error("Erro ao criar pedido:", error));
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Carregando automóveis...</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main style={styles.page}>
        <div style={styles.container}>
          
          <button
            style={styles.backBtn}
            onClick={() => navigate("/cliente/dashboard")}
          >
            ← Voltar
          </button>

          <h1 style={styles.title}>Automóveis Disponíveis</h1>

          <div style={styles.grid}>
            {automoveis.map((carro) => (
              <div key={carro.id} style={styles.card}>
                
                <div style={styles.cardHeader}>
                  <h3 style={styles.carTitle}>
                    {carro.marca} {carro.modelo}
                  </h3>
                  <span style={styles.status}>{carro.status}</span>
                </div>

                <div style={styles.info}>
                  <p><strong>Ano:</strong> {carro.ano}</p>
                  <p><strong>Placa:</strong> {carro.placa}</p>
                </div>

                <button
                  style={styles.alugarBtn}
                  onClick={() => handleAlugar(carro.id)}
                >
                  Alugar agora
                </button>

              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    paddingTop: "90px",
    paddingBottom: "60px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#f1f5f9,#e0f2fe)",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 20px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "30px",
    color: "#1a1a2e",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "all 0.2s ease",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  carTitle: {
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
  },

  status: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#16a34a",
    background: "#dcfce7",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  info: {
    fontSize: "14px",
    color: "#555",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  alugarBtn: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316)",
    color: "#1a1a2e",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
  },

  backBtn: {
    marginBottom: "20px",
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },

  /* loading */
  loading: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #f59e0b",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};