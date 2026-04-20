import { useEffect, useState } from "react";
import axios from "axios";
import { listarPedidosCliente } from "../../service/clienteService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DetalhePedidoModal from "./DetalhePedido";
import AlertMessage from "../../components/AlertMessage";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const clienteId = usuario?.id;

    listarPedidosCliente(clienteId)
      .then((response) => setPedidos(response.data))
      .catch(() =>
        setAlert({
          show: true,
          type: "error",
          message: "Erro ao buscar pedidos",
        })
      );
  }, []);

  const handleCancelar = async (id) => {
    try {
      await axios.put(`http://localhost:8080/pedidos/${id}/cancelar`);

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "CANCELADO" } : p
        )
      );

      setAlert({
        show: true,
        type: "success",
        message: "Pedido cancelado com sucesso!",
      });

    } catch (error) {
      console.error(error);

      setAlert({
        show: true,
        type: "error",
        message: "Erro ao cancelar pedido",
      });
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APROVADO":
        return { background: "#dcfce7", color: "#166534" };
      case "PENDENTE":
        return { background: "#fef3c7", color: "#92400e" };
      case "CANCELADO":
        return { background: "#fee2e2", color: "#991b1b" };
      default:
        return {};
    }
  };

  return (
    <div style={styles.page}>
      <Header />

      {/* 🔥 ALERT TOAST */}
      {alert.show && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <main style={styles.main}>
        <div style={styles.container}>
          <button onClick={() => navigate("/home")} style={styles.backBtn}>
            ← Voltar
          </button>

          <h1 style={styles.title}>Meus Pedidos</h1>
          <p style={styles.subtitle}>Acompanhe e gerencie seus pedidos</p>

          {pedidos.length === 0 ? (
            <p style={styles.empty}>Você ainda não possui pedidos.</p>
          ) : (
            <div style={styles.grid}>
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  onClick={() => setPedidoSelecionado(pedido.id)}
                  style={styles.card}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div style={styles.cardHeader}>
                    <h4 style={styles.cardTitle}>Pedido #{pedido.id}</h4>

                    <span
                      style={{
                        ...styles.badge,
                        ...getStatusStyle(pedido.status),
                      }}
                    >
                      {pedido.status}
                    </span>
                  </div>

                  <div style={styles.info}>
                    <p>
                      <strong>Data:</strong>{" "}
                      {formatarData(pedido.dataSolicitacao)}
                    </p>

                    <p style={styles.valor}>
                      R$ {Number(pedido.valorPrevisto).toFixed(2)}
                    </p>
                  </div>

                  {pedido.status === "PENDENTE" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelar(pedido.id);
                      }}
                      style={styles.cancelBtn}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {pedidoSelecionado && (
        <DetalhePedidoModal
          id={pedidoSelecionado}
          onClose={() => setPedidoSelecionado(null)}
        />
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg,#f1f5f9,#e0f2fe)",
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "50px 16px",
  },

  container: {
    width: "100%",
    maxWidth: "1000px",
  },

  backBtn: {
    marginBottom: "16px",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "4px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px",
  },

  empty: {
    color: "#6b7280",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#fff",
    padding: "18px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
  },

  badge: {
    padding: "4px 10px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "600",
  },

  info: {
    fontSize: "13px",
    color: "#6b7280",
  },

  valor: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#f97316",
    marginTop: "6px",
  },

  cancelBtn: {
  marginTop: 'auto',
  padding: '10px',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(135deg,#ef4444,#dc2626)',
  color: '#fff',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
  transition: '0.2s',
},
};
