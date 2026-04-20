import { useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContatoEmail() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          name: form.nome,
          email: form.email,
          telefone: form.telefone,
          message: form.mensagem,
        },
        import.meta.env.VITE_EMAIL_PUBLIC
      );

      setStatus("Mensagem enviada com sucesso!");
      setForm({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("Erro ao enviar mensagem.");
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Fale com a CIEL Cars</h2>
          <p style={styles.subtitle}>
            Envie uma mensagem e responderemos o mais rápido possível
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>

            <div style={styles.grid}>
              <input
                style={styles.input}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={form.nome}
                onChange={handleChange}
                required
              />

              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Seu email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              style={styles.input}
              type="tel"
              name="telefone"
              placeholder="Telefone (opcional)"
              value={form.telefone}
              onChange={handleChange}
            />

            <textarea
              style={{ ...styles.input, minHeight: "120px" }}
              name="mensagem"
              placeholder="Digite sua mensagem..."
              value={form.mensagem}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>

            {status && (
              <div
                style={{
                  ...styles.status,
                  background: status.includes("sucesso")
                    ? "#dcfce7"
                    : "#fee2e2",
                  color: status.includes("sucesso")
                    ? "#166534"
                    : "#b91c1c",
                }}
              >
                {status}
              </div>
            )}
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
    background: "#f9fafb",
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
    maxWidth: "700px",
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 800,
    color: "#1a1a2e",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
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

  status: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "13px",
    textAlign: "center",
  },
};