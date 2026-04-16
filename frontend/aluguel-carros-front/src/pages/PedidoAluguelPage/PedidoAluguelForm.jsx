import React, { useEffect, useState } from "react";
import axios from "axios";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
};

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

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  useEffect(() => {
    if (usuarioLogado?.id) buscarCliente(usuarioLogado.id);
    if (automovelId) buscarCarro(automovelId);
  }, []);

  useEffect(() => {
    calcularValores();
  }, [form.dataFimPretendida, carro]);

  const buscarCliente = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/clientes/${id}`);
      setCliente(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarCarro = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/automoveis/${id}`);
      setCarro(res.data);
    } catch (error) {
      console.error(error);
    }
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      clienteId: cliente.id,
      automovelId,
      quantidadeDias,
      observacoes: form.observacoes,
    };
    try {
      await axios.post("http://localhost:8080/pedidos", payload);
      alert("Pedido criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  if (!cliente || !carro) return (
    <p style={{ textAlign: "center", color: "#185FA5", fontSize: "14px" }}>Carregando...</p>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Dados do cliente */}
      <div style={{
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #d1d5db",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}>
        <span style={{ fontSize: "12px", color: "#185FA5", fontWeight: 600, marginBottom: "4px" }}>
          Seus dados
        </span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>{cliente.nome}</span>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>{cliente.email}</span>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>{cliente.telefone}</span>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>Data fim</label>
          <input
            type="date"
            name="dataFimPretendida"
            value={form.dataFimPretendida}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "13px", color: "#6b7280", fontWeight: 500 }}>Observações</label>
          <textarea
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          />
        </div>

        {/* Resumo */}
        {quantidadeDias > 0 && (
          <div style={{
            padding: "14px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #f1f5f9, #e0f2fe)",
            border: "1px solid #d1d5db",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>Quantidade de dias</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                {quantidadeDias}d
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>Total estimado</span>
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#185FA5" }}>
                R$ {valorTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || quantidadeDias <= 0}
          style={{
            marginTop: "4px",
            padding: "12px",
            background: loading || quantidadeDias <= 0 ? "#e5e7eb" : "#185FA5",
            color: loading || quantidadeDias <= 0 ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "14px",
            cursor: loading || quantidadeDias <= 0 ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {loading ? "Enviando..." : "Confirmar Pedido"}
        </button>
      </form>
    </div>
  );
};

export default PedidoAluguelForm;