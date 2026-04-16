import { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function CadastroCliente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    rg: "",
    telefone: "",
    dataNascimento: "",
    profissao: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      logradouro: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [buscandoCep, setBuscandoCep] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleEnderecoChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      endereco: {
        ...form.endereco,
        [name]: value,
      },
    });
  }

  async function buscarCep(cep) {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          rua: "",
          bairro: "",
          cidade: "",
          estado: "",
        },
      }));
      return;
    }

    try {
      setBuscandoCep(true);

      const res = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      if (res.data.erro) {
        setErro("CEP não encontrado");
        return;
      }

      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          rua: res.data.logradouro,
          bairro: res.data.bairro,
          cidade: res.data.localidade,
          estado: res.data.uf,
        },
      }));
    } catch (err) {
      console.error(err);
      setErro("Erro ao buscar CEP");
    } finally {
      setBuscandoCep(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    const payload = {
      ...form,
      entidadesEmpregadoras: [],
    };

    try {
      await axios.post("http://localhost:8080/clientes", payload);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErro("Erro ao cadastrar cliente");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#f9fafb",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 16px",
          background: "linear-gradient(135deg, #f1f5f9, #e0f2fe)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#185FA5" }}>
            Criar Conta
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input style={inputStyle} name="nome" placeholder="Nome" onChange={handleChange} required />
            <input style={inputStyle} name="email" placeholder="Email" onChange={handleChange} required />
            <input style={inputStyle} name="senha" type="password" placeholder="Senha" onChange={handleChange} required />

            <InputMask mask="999.999.999-99" value={form.cpf} onChange={handleChange}>
              {(inputProps) => (
                <input {...inputProps} style={inputStyle} name="cpf" placeholder="CPF" required />
              )}
            </InputMask>

            <input style={inputStyle} name="rg" placeholder="RG" onChange={handleChange} required />

            <InputMask mask="(99) 99999-9999" value={form.telefone} onChange={handleChange}>
              {(inputProps) => (
                <input {...inputProps} style={inputStyle} name="telefone" placeholder="Telefone" required />
              )}
            </InputMask>

            <input style={inputStyle} name="dataNascimento" type="date" onChange={handleChange} required />
            <input style={inputStyle} name="profissao" placeholder="Profissão" onChange={handleChange} required />

            <h4 style={{ marginTop: "10px", color: "#185FA5" }}>Endereço</h4>

            <InputMask
              mask="99999-999"
              value={form.endereco.cep}
              onChange={(e) => {
                const value = e.target.value;

                handleEnderecoChange({
                  target: {
                    name: "cep",
                    value: value,
                  },
                });

                buscarCep(value);
              }}
            >
              {(inputProps) => (
                <input {...inputProps} style={inputStyle} name="cep" placeholder="CEP" required />
              )}
            </InputMask>

            {buscandoCep && (
              <span style={{ fontSize: "12px", color: "#185FA5" }}>
                Buscando CEP...
              </span>
            )}

            <input style={inputStyle} name="rua" placeholder="Rua" value={form.endereco.rua} onChange={handleEnderecoChange} required />
            <input style={inputStyle} name="numero" placeholder="Número" onChange={handleEnderecoChange} required />
            <input style={inputStyle} name="bairro" placeholder="Bairro" value={form.endereco.bairro} onChange={handleEnderecoChange} required />
            <input style={inputStyle} name="cidade" placeholder="Cidade" value={form.endereco.cidade} onChange={handleEnderecoChange} required />
            <input style={inputStyle} name="estado" placeholder="Estado" value={form.endereco.estado} onChange={handleEnderecoChange} required />
            <input style={inputStyle} name="logradouro" placeholder="Complemento" onChange={handleEnderecoChange} />

            {erro && <div style={{ color: "red" }}>{erro}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "10px",
                padding: "12px",
                background: "#185FA5",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}