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

  const inputStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO */}
      <main
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #0f172a, #185FA5)",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "700px",
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#185FA5",
              textAlign: "center",
            }}
          >
            Fale com a CIEL Cars
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={form.nome}
                onChange={handleChange}
                required
              />

              <input
                style={{ ...inputStyle, flex: 1 }}
                type="email"
                name="email"
                placeholder="Seu email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              style={inputStyle}
              type="tel"
              name="telefone"
              placeholder="Telefone (opcional)"
              value={form.telefone}
              onChange={handleChange}
            />

            <textarea
              style={{ ...inputStyle, minHeight: "120px", resize: "none" }}
              name="mensagem"
              placeholder="Digite sua mensagem..."
              value={form.mensagem}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: "#185FA5",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>

            {status && (
              <p
                style={{
                  marginTop: "10px",
                  textAlign: "center",
                  color: status.includes("sucesso") ? "green" : "red",
                }}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}