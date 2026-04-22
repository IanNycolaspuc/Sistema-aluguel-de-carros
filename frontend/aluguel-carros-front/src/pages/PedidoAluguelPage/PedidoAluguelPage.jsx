import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PedidoAluguelForm from "./PedidoAluguelForm";

export default function PedidoAluguelPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const carro = location.state?.automovelSelecionado;

  if (!carro) {
    return (
      <p style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        Carro não selecionado
      </p>
    );
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>

          {/* CARD DO CARRO */}
          <div style={styles.card}>
            <div style={styles.carImage}>
              <img
                src={`https://luizfagundest.github.io/imagens/${carro.marca.replace(/\s+/g, "-")}-${carro.modelo.replace(/\s+/g, "-")}-${carro.ano}.png`}
                alt={`${carro.marca} ${carro.modelo}`}
                style={styles.img}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div style={styles.fallback}>🚗</div>
            </div>

            <div style={styles.cardContent}>
              <div>
                <h2 style={styles.carTitle}>
                  {carro.marca} {carro.modelo}
                </h2>
                <p style={styles.carInfo}>
                  {carro.ano} • {carro.placa}
                </p>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.label}>Matrícula</span>
                <span style={styles.value}>{carro.matricula}</span>
              </div>

              <div style={styles.priceBox}>
                <span style={styles.priceValue}>
                  R$ {Number(carro.valorDiaria).toFixed(2)}
                </span>
                <span style={styles.pricePerDay}>/ dia</span>
              </div>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <div style={styles.card}>
            <h2 style={styles.title}>Finalizar Pedido</h2>

            <PedidoAluguelForm automovelId={carro.id} />

            <button onClick={() => navigate(-1)} style={styles.secondaryButton}>
              Voltar
            </button>
          </div>

        </div>
      </main>

      <Footer />
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
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: "1000px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },

  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 800,
    color: "#1a1a2e",
  },

carImage: {
  height: "200px",
  borderRadius: "16px",
  background: "#ffffff", // 🔥 fundo branco clean
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden"
},

img: {
  maxWidth: "90%",
  maxHeight: "90%",
  objectFit: "contain",
  transition: "0.3s ease"
},
  fallback: {
    display: "none",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "64px",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  carTitle: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#111827",
    margin: 0,
  },

  carInfo: {
    fontSize: "13px",
    color: "#6b7280",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    background: "#f9fafb",
    borderRadius: "10px",
    fontSize: "13px",
  },

  label: {
    color: "#6b7280",
  },

  value: {
    fontWeight: 600,
    color: "#111827",
  },

  priceBox: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginTop: "6px",
  },

  priceValue: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#111827",
  },

  pricePerDay: {
    fontSize: "13px",
    color: "#6b7280",
  },

  secondaryButton: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
};