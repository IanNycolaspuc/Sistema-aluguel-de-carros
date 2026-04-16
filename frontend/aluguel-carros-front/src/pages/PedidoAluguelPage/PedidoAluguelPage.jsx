import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PedidoAluguelForm from "./PedidoAluguelForm";

export default function PedidoAluguelPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const carro = location.state?.automovelSelecionado;

  if (!carro) {
    return <p style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>Carro não selecionado</p>;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f9fafb" }}>
      <Header />

      <main style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 16px",
        background: "linear-gradient(135deg, #f1f5f9, #e0f2fe)",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "900px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}>

          {/* Card do carro */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{
              height: "160px",
              background: "linear-gradient(135deg, #e0f2fe, #f1f5f9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "64px",
            }}>
              🚗
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111827" }}>
                {carro.marca} {carro.modelo}
              </h2>

              <p style={{ color: "#9ca3af", fontSize: "13px" }}>
                {carro.ano} • {carro.placa}
              </p>

              <div style={{
                marginTop: "8px",
                padding: "12px 14px",
                background: "linear-gradient(135deg, #f1f5f9, #e0f2fe)",
                borderRadius: "12px",
                fontSize: "13px",
                color: "#374151",
              }}>
                <span style={{ color: "#6b7280" }}>Matrícula: </span>
                <strong>{carro.matricula}</strong>
              </div>

              <div style={{
                padding: "12px 14px",
                background: "#185FA5",
                borderRadius: "12px",
                color: "#fff",
                fontSize: "20px",
                fontWeight: 700,
                textAlign: "center",
              }}>
                R$ {Number(carro.valorDiaria).toFixed(2)}
                <span style={{ fontSize: "13px", fontWeight: 400, opacity: 0.85 }}> / dia</span>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#185FA5", margin: 0 }}>
              Finalizar Pedido
            </h2>

            <PedidoAluguelForm automovelId={carro.id} />

            <button
              onClick={() => navigate(-1)}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                background: "#fff",
                color: "#374151",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              Voltar
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}