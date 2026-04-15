import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PedidoAluguelForm from "./PedidoAluguelForm";

export default function PedidoAluguelPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const carro = location.state?.automovelSelecionado;

  if (!carro) {
    return <p>Carro não selecionado</p>;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f9fafb" }}>
      <Header />

      <main style={{ flex: 1, padding: "2rem", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: "900px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px"
        }}>

          {/* 🚗 Card do carro */}
          <div style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "140px",
              background: "#f3f4f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px"
            }}>
              🚗
            </div>

            <div style={{ padding: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
                {carro.marca} {carro.modelo}
              </h2>

              <p style={{ color: "#6b7280", fontSize: "14px" }}>
                {carro.ano} • {carro.placa}
              </p>

              <div style={{ marginTop: "10px", fontSize: "14px" }}>
                <strong>Matrícula:</strong> {carro.matricula}
              </div>
            </div>
          </div>

          {/* 📋 Formulário */}
          <div style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px"
          }}>
            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
              Finalizar Pedido
            </h2>

            <PedidoAluguelForm automovelId={carro.id} />

            <button
              onClick={() => navigate(-1)}
              style={{
                marginTop: "12px",
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer"
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