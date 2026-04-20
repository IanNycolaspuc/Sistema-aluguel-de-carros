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

          {/* Card do carro */}
          <div style={styles.card}>
            <div style={styles.carImage}>🚗</div>

            <div style={styles.cardContent}>
              <h2 style={styles.carTitle}>
                {carro.marca} {carro.modelo}
              </h2>

              <p style={styles.carInfo}>
                {carro.ano} • {carro.placa}
              </p>

              <div style={styles.badge}>
                Matrícula: <strong>{carro.matricula}</strong>
              </div>

              <div style={styles.price}>
                R$ {Number(carro.valorDiaria).toFixed(2)}
                <span style={styles.priceSmall}> / dia</span>
              </div>
            </div>
          </div>

          {/* Formulário */}
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
    padding: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 800,
    color: "#1a1a2e",
  },

  carImage: {
    height: "140px",
    borderRadius: "12px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
  },

  cardContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  carTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1a1a2e",
  },

  carInfo: {
    fontSize: "13px",
    color: "#6b7280",
  },

  badge: {
    padding: "10px",
    borderRadius: "10px",
    background: "#f1f5f9",
    fontSize: "13px",
  },

  price: {
    padding: "12px",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: 800,
    textAlign: "center",
    fontSize: "18px",
  },

  priceSmall: {
    fontSize: "12px",
    marginLeft: "4px",
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