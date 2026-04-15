import React, { useEffect, useState } from "react";
import axios from "axios";

const PedidoAluguelForm = ({ automovelId }) => {
  const [cliente, setCliente] = useState(null);
  const [form, setForm] = useState({
    dataFimPretendida: "",
    observacoes: ""
  });
  const [loading, setLoading] = useState(false);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    if (usuarioLogado?.id) {
      buscarCliente(usuarioLogado.id);
    }
  }, []);

  const buscarCliente = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/clientes/${id}`);
      setCliente(response.data);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      clienteId: cliente.id,
      automovelId: automovelId,
      dataFimPretendida: form.dataFimPretendida,
      observacoes: form.observacoes
    };

    try {
      await axios.post("http://localhost:8080/pedidos", payload);
      alert("Pedido de aluguel criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  if (!cliente) return <p style={{ textAlign: "center" }}>Carregando dados...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Solicitar Aluguel</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* 👤 Cliente */}
        <div style={styles.group}>
          <label style={styles.label}>Nome</label>
          <input style={styles.inputDisabled} value={cliente.nome} disabled />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Email</label>
          <input style={styles.inputDisabled} value={cliente.email} disabled />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Telefone</label>
          <input style={styles.inputDisabled} value={cliente.telefone} disabled />
        </div>

        {/* 📅 Pedido */}
        <div style={styles.group}>
          <label style={styles.label}>Data fim pretendida</label>
          <input
            type="date"
            name="dataFimPretendida"
            value={form.dataFimPretendida}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Observações</label>
          <textarea
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Opcional..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Enviando..." : "Confirmar Pedido"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#111827"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  group: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },

  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s",
  },

  inputDisabled: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    backgroundColor: "#f3f4f6",
    color: "#6b7280"
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    minHeight: "80px",
    resize: "none",
    outline: "none"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#185FA5",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.2s"
  }
};

export default PedidoAluguelForm;