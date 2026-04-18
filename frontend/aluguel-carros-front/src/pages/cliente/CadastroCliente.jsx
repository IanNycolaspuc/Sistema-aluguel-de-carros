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

    if (cepLimpo.length !== 8) return;

    try {
      setBuscandoCep(true);

      const res = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

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
    } catch {
      setErro("Erro ao buscar CEP");
    } finally {
      setBuscandoCep(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await axios.post("http://localhost:8080/clientes", {
        ...form,
        entidadesEmpregadoras: [],
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch {
      setErro("Erro ao cadastrar cliente");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Criar Conta</h2>
          <p style={styles.subtitle}>
            Preencha seus dados para começar
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.grid}>
              <input style={styles.input} name="nome" placeholder="Nome completo" onChange={handleChange} required />
              <input style={styles.input} name="email" placeholder="Email" onChange={handleChange} required />
              <input style={styles.input} name="senha" type="password" placeholder="Senha" onChange={handleChange} required />

              <InputMask mask="999.999.999-99" value={form.cpf} onChange={handleChange}>
                {(props) => <input {...props} style={styles.input} name="cpf" placeholder="CPF" required />}
              </InputMask>

              <input style={styles.input} name="rg" placeholder="RG" onChange={handleChange} required />

              <InputMask mask="(99) 99999-9999" value={form.telefone} onChange={handleChange}>
                {(props) => <input {...props} style={styles.input} name="telefone" placeholder="Telefone" required />}
              </InputMask>

              <input style={styles.input} type="date" name="dataNascimento" onChange={handleChange} required />
              <input style={styles.input} name="profissao" placeholder="Profissão" onChange={handleChange} required />
            </div>

            <h4 style={styles.sectionTitle}>Endereço</h4>

            <div style={styles.grid}>
              <InputMask
                mask="99999-999"
                value={form.endereco.cep}
                onChange={(e) => {
                  handleEnderecoChange({
                    target: { name: "cep", value: e.target.value },
                  });
                  buscarCep(e.target.value);
                }}
              >
                {(props) => <input {...props} style={styles.input} placeholder="CEP" required />}
              </InputMask>

              <input style={styles.input} name="rua" value={form.endereco.rua} placeholder="Rua" onChange={handleEnderecoChange} required />
              <input style={styles.input} name="numero" placeholder="Número" onChange={handleEnderecoChange} required />
              <input style={styles.input} name="bairro" value={form.endereco.bairro} placeholder="Bairro" onChange={handleEnderecoChange} required />
              <input style={styles.input} name="cidade" value={form.endereco.cidade} placeholder="Cidade" onChange={handleEnderecoChange} required />
              <input style={styles.input} name="estado" value={form.endereco.estado} placeholder="Estado" onChange={handleEnderecoChange} required />
              <input style={styles.input} name="logradouro" placeholder="Complemento" onChange={handleEnderecoChange} />
            </div>

            {buscandoCep && <span style={styles.info}>Buscando CEP...</span>}
            {erro && <div style={styles.error}>{erro}</div>}

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Cadastrando..." : "Criar conta"}
            </button>

          </form>
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
    background: "linear-gradient(135deg,#0f172a,#1a1a2e)",
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: 800,
    color: "#1a1a2e",
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "12px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
  },

  sectionTitle: {
    marginTop: "10px",
    fontWeight: 700,
    color: "#1a1a2e",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 10px 25px rgba(245,158,11,0.35)",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "13px",
  },

  info: {
    fontSize: "12px",
    color: "#f59e0b",
  },
};