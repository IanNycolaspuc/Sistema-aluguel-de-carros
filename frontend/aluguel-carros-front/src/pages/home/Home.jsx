import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const statusConfig = {
  DISPONIVEL: { label: "Disponível", color: "#166534", bg: "#dcfce7" },
  ALUGADO: { label: "Alugado", color: "#92400e", bg: "#fef3c7" },
  MANUTENCAO: { label: "Manutenção", color: "#991b1b", bg: "#fee2e2" },
};

export default function Home() {
  const navigate = useNavigate();
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    fetch("http://localhost:8080/automoveis")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar automóveis");
        return res.json();
      })
      .then((data) => setCarros(data))
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleAlugar(carro) {
    if (!usuario) {
      navigate("/login");
      return;
    }
    navigate("/cliente/pedido-aluguel", {
      state: { automovelSelecionado: carro },
    });
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>
          {/* HEADER */}
          <div style={styles.header}>
            <h1 style={styles.title}>Encontre o carro ideal</h1>
            <p style={styles.subtitle}>
              {usuario
                ? "Escolha um veículo e comece sua viagem"
                : "Faça login para alugar um veículo"}
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div style={styles.loading}>
              <div style={styles.spinner}></div>
              <p>Carregando automóveis...</p>
            </div>
          )}

          {/* ERRO */}
          {erro && <div style={styles.error}>{erro}</div>}

          {/* LISTA */}
          {!loading && !erro && (
            <div style={styles.grid}>
              {carros.map((carro) => {
                const s = statusConfig[carro.status] || statusConfig.DISPONIVEL;

                const disponivel = carro.status === "DISPONIVEL";

                return (
                  <div
                    key={carro.id}
                    style={styles.card}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow =
                        "0 16px 40px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.06)";
                    }}
                  >
                    {/* IMAGEM */}
                    <div style={styles.image}>
                      <img
                        src={`https://luizfagundest.github.io/imagens/${carro.marca}-${carro.modelo}-${carro.ano}.png`}
                        alt={`${carro.marca} ${carro.modelo}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />

                      <span style={{ ...styles.fakeCar, display: "none" }}>
                        🚘
                      </span>
                    </div>

                    {/* CONTEÚDO */}
                    <div style={styles.content}>
                      <div>
                        <h3 style={styles.carTitle}>
                          {carro.marca} {carro.modelo}
                        </h3>
                        <p style={styles.carInfo}>
                          {carro.ano} • {carro.placa}
                        </p>
                      </div>

                      {/* PREÇO */}
                      <div style={styles.price}>
                        R$ {Number(carro.valorDiaria).toFixed(2)}
                        <span style={styles.perDay}> / dia</span>
                      </div>

                      {/* STATUS */}
                      <span
                        style={{
                          ...styles.badge,
                          background: s.bg,
                          color: s.color,
                        }}
                      >
                        {s.label}
                      </span>

                      {/* BOTÃO */}
                      <button
                        onClick={() => handleAlugar(carro)}
                        disabled={!disponivel}
                        style={{
                          ...styles.button,
                          background: disponivel
                            ? "linear-gradient(135deg,#f59e0b,#f97316)"
                            : "#e5e7eb",
                          color: disponivel ? "#1a1a2e" : "#9ca3af",
                          cursor: disponivel ? "pointer" : "not-allowed",
                        }}
                      >
                        {disponivel ? "Alugar agora" : "Indisponível"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* 🎨 ESTILOS */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f9fafb",
  },

  main: {
    flex: 1,
    paddingTop: "90px",
    paddingBottom: "60px",
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(135deg,#f1f5f9,#e0f2fe)",
  },

  container: {
    width: "100%",
    maxWidth: "1200px",
    padding: "0 20px",
  },

  header: {
    marginBottom: "32px",
    textAlign: "center",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1a1a2e",
  },

  subtitle: {
    marginTop: "6px",
    color: "#6b7280",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.25s ease",
  },

  image: {
    height: "150px",
    background: "linear-gradient(135deg,#f1f5f9,#e0f2fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  fakeCar: {
    fontSize: "48px",
    opacity: 0.6,
  },

  content: {
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  carTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
  },

  carInfo: {
    fontSize: "13px",
    color: "#6b7280",
  },

  price: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1a1a2e",
  },

  perDay: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: "400",
  },

  badge: {
    alignSelf: "flex-start",
    fontSize: "11px",
    fontWeight: "700",
    padding: "5px 12px",
    borderRadius: "20px",
  },

  button: {
    marginTop: "auto",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "700",
    fontSize: "14px",
    transition: "0.2s",
  },

  loading: {
    display: "flex",
    flexDirection: "column",
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

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "12px",
    borderRadius: "10px",
  },
};
