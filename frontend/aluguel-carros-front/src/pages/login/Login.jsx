import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const resposta = await login(email, senha);

      localStorage.setItem("usuarioLogado", JSON.stringify(resposta));

      if (resposta.tipoUsuario === "CLIENTE") {
        navigate('/home');
      } else if (resposta.tipoUsuario === "AGENTE") {
        navigate("/agente/dashboard");
      } else {
        setErro("Tipo de usuário inválido.");
      }
    } catch (error) {
      setErro("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        
        <h1 style={styles.logo}>logo CIEL Cars</h1>
        <p style={styles.subtitle}>Acesse sua conta</p>

        <form onSubmit={handleLogin} style={styles.form}>

          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
            required
          />

          {erro && <div style={styles.error}>{erro}</div>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div style={styles.register}>
            Não tem conta?{" "}
            <span
              style={styles.registerSpan}
              onClick={() => navigate("/cadastro")}
            >
              Criar agora
            </span>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    background: "linear-gradient(135deg, #0f172a, #1a1a2e)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(6px)",
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "380px",
    background: "#ffffff",
    padding: "36px 30px",
    borderRadius: "18px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  logo: {
    textAlign: "center",
    margin: 0,
    fontSize: "26px",
    fontWeight: "900",
    color: "#1a1a2e",
  },

  subtitle: {
    textAlign: "center",
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
  },

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
    outline: "none",
    transition: "all 0.2s ease",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: "800",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.35)",
    transition: "all 0.2s ease",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    textAlign: "center",
  },

  register: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "10px",
    color: "#6b7280",
  },

  registerSpan: {
    color: "#f59e0b",
    fontWeight: "700",
    cursor: "pointer",
  },
};