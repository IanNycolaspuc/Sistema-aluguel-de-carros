import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AlertMessage from "../../components/AlertMessage";

export default function EditarCliente() {
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

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
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const id = usuarioLogado?.id;

  useEffect(() => {
    async function carregarCliente() {
      try {
        const res = await axios.get(`http://localhost:8080/clientes/${id}`);
        setForm(res.data);
      } catch {
        setAlerta({
          type: "error",
          message: "Erro ao carregar dados do cliente",
        });
      }
    }

    if (id) carregarCliente();
  }, [id]);

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

      const res = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          logradouro: res.data.logradouro,
          bairro: res.data.bairro,
          cidade: res.data.localidade,
          estado: res.data.uf,
        },
      }));
    } catch {
      setAlerta({
        type: "error",
        message: "Erro ao buscar CEP",
      });
    } finally {
      setBuscandoCep(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:8080/clientes/${id}`, form);

      setAlerta({
        type: "success",
        message: "Dados atualizados com sucesso!",
      });
    } catch {
      setAlerta({
        type: "error",
        message: "Erro ao atualizar dados",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <Header />

      {alerta && (
        <AlertMessage
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Editar Conta</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid}>
              <div>
                <label style={styles.label}>Nome completo</label>
                <input
                  style={styles.input}
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label style={styles.label}>Email</label>
                <input
                  style={styles.input}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label style={styles.label}>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  value={form.cpf}
                  onChange={handleChange}
                >
                  {(props) => (
                    <input
                      {...props}
                      style={styles.input}
                      name="cpf"
                      placeholder="000.000.000-00"
                    />
                  )}
                </InputMask>
              </div>

              <div>
                <label style={styles.label}>Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={form.telefone}
                  onChange={handleChange}
                >
                  {(props) => (
                    <input
                      {...props}
                      style={styles.input}
                      name="telefone"
                      placeholder="(31) 99999-9999"
                    />
                  )}
                </InputMask>
              </div>

              <div>
                <label style={styles.label}>Profissão</label>
                <input
                  style={styles.input}
                  name="profissao"
                  value={form.profissao}
                  onChange={handleChange}
                  placeholder="Ex: Engenheiro"
                />
              </div>
            </div>

            <h4 style={styles.sectionTitle}>Endereço</h4>

            <div style={styles.grid}>
              <div>
                <label style={styles.label}>CEP</label>
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
                  {(props) => (
                    <input
                      {...props}
                      style={styles.input}
                      placeholder="00000-000"
                    />
                  )}
                </InputMask>
              </div>

              <div>
                <label style={styles.label}>Rua</label>
                <input
                  style={styles.input}
                  name="logradouro"
                  value={form.endereco.logradouro}
                  onChange={handleEnderecoChange}
                />
              </div>

              <div>
                <label style={styles.label}>Número</label>
                <input
                  style={styles.input}
                  name="numero"
                  value={form.endereco.numero}
                  onChange={handleEnderecoChange}
                />
              </div>

              <div>
                <label style={styles.label}>Complemento</label>
                <input
                  style={styles.input}
                  name="complemento"
                  value={form.endereco.complemento}
                  onChange={handleEnderecoChange}
                />
              </div>

              <div>
                <label style={styles.label}>Bairro</label>
                <input
                  style={styles.input}
                  name="bairro"
                  value={form.endereco.bairro}
                  onChange={handleEnderecoChange}
                />
              </div>

              <div>
                <label style={styles.label}>Cidade</label>
                <input
                  style={styles.input}
                  name="cidade"
                  value={form.endereco.cidade}
                  onChange={handleEnderecoChange}
                />
              </div>

              <div>
                <label style={styles.label}>Estado</label>
                <input
                  style={styles.input}
                  name="estado"
                  value={form.endereco.estado}
                  onChange={handleEnderecoChange}
                />
              </div>
            </div>

            {buscandoCep && <span style={styles.info}>Buscando CEP...</span>}

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Atualizando..." : "Salvar alterações"}
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
  },
  title: {
    fontSize: "24px",
    fontWeight: 800,
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
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "4px",
    display: "block",
    color: "#374151",
  },
  button: {
    padding: "14px",
    borderRadius: "10px",
    background: "#f97316",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  info: {
    fontSize: "12px",
    color: "#f59e0b",
  },
};
