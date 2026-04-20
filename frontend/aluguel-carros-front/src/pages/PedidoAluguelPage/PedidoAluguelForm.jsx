import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";

const PedidoAluguelForm = ({ automovelId }) => {
  const [cliente, setCliente] = useState(null);
  const [carro, setCarro] = useState(null);

  const [form, setForm] = useState({
    dataFimPretendida: "",
    observacoes: "",
  });

  const [quantidadeDias, setQuantidadeDias] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    if (usuarioLogado?.id) buscarCliente(usuarioLogado.id);
    if (automovelId) buscarCarro(automovelId);
  }, []);

  useEffect(() => {
    calcularValores();
  }, [form.dataFimPretendida, carro]);

  const buscarCliente = async (id) => {
    const res = await axios.get(`http://localhost:8080/clientes/${id}`);
    setCliente(res.data);
  };

  const buscarCarro = async (id) => {
    const res = await axios.get(`http://localhost:8080/automoveis/${id}`);
    setCarro(res.data);
  };

  const calcularValores = () => {
    if (!form.dataFimPretendida || !carro) return;

    const hoje = new Date();
    const dataFim = new Date(form.dataFimPretendida);
    const dias = Math.ceil((dataFim - hoje) / (1000 * 60 * 60 * 24));

    if (dias > 0) {
      setQuantidadeDias(dias);
      setValorTotal(dias * carro.valorDiaria);
    } else {
      setQuantidadeDias(0);
      setValorTotal(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/pedidos", {
        clienteId: cliente.id,
        automovelId,
        quantidadeDias,
        observacoes: form.observacoes,
      });

      setAlert({
        show: true,
        type: "success",
        message: "Pedido criado com sucesso, confira em Meus Pedidos!",
      });

      // redireciona após 2s
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch {
      setAlert({
        show: true,
        type: "error",
        message: "Erro ao criar pedido",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!cliente || !carro) return <p>Carregando...</p>;

  return (
    <>
      {/* ALERT GLOBAL (top-right) */}
      {alert.show && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.box}>
          <span style={styles.sectionLabel}>Seus dados</span>
          <strong>{cliente.nome}</strong>
          <span>{cliente.email}</span>
          <span>{cliente.telefone}</span>
        </div>

        <input
          type="date"
          name="dataFimPretendida"
          value={form.dataFimPretendida}
          onChange={(e) =>
            setForm({ ...form, dataFimPretendida: e.target.value })
          }
          style={styles.input}
          required
        />

        <textarea
          name="observacoes"
          placeholder="Observações"
          value={form.observacoes}
          onChange={(e) =>
            setForm({ ...form, observacoes: e.target.value })
          }
          style={{ ...styles.input, minHeight: "80px" }}
        />

        {quantidadeDias > 0 && (
          <div style={styles.resumo}>
            <div>
              <span style={styles.resumoLabel}>Dias: </span>
              <strong>{quantidadeDias}</strong>
            </div>

            <div style={{ textAlign: "right" }}>
              <span style={styles.resumoLabel}>Total: </span>
              <strong>R$ {valorTotal.toFixed(2)}</strong>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || quantidadeDias <= 0}
          style={styles.button}
        >
          {loading ? "Enviando..." : "Confirmar Pedido"}
        </button>

      </form>
    </>
  );
};

export default PedidoAluguelForm;

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },

  box: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  sectionLabel: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#f59e0b",
  },

  resumo: {
    padding: "12px",
    borderRadius: "10px",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "space-between",
  },

  resumoLabel: {
    fontSize: "12px",
    color: "#6b7280",
  },

  button: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: 800,
    cursor: "pointer",
  },
};