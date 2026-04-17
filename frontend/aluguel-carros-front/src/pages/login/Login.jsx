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
        navigate('/home'); // ao fazer login continuo na tela de aluguel de carros. mudei de navigate() para o que esta agora // 
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
      
      {/* Fundo com gradiente */}
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        
        <h1 style={styles.logo}>CIEL Cars</h1>
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
            <span onClick={() => navigate("/cadastro")}>
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
    background: "linear-gradient(135deg, #0f172a, #185FA5)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backdropFilter: "blur(4px)",
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "380px",
    background: "#ffffff",
    padding: "35px 30px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  logo: {
    textAlign: "center",
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#185FA5",
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
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #185FA5, #1d4ed8)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.2s",
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
    color: "#185FA5",
    fontWeight: "600",
    cursor: "pointer",
  },
};