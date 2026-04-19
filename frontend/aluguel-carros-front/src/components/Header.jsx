import { useNavigate } from "react-router-dom";
import logoCiel from "../assets/logo-ciel.png"
export default function Header() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  function handleLogout() {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  }

  return (
    <header style={styles.header}>
      
      {/* LOGO */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        <img src={logoCiel} alt="CIEL Cars" style={styles.logoImg} />
      </div>

      {/* AÇÕES */}
      <div style={styles.right}>
        {usuario ? (
          <>
            <span style={styles.user}>
              Olá, {usuario.nome.split(" ")[0]}
            </span>

            {/* CLIENTE */}
            {usuario.tipoUsuario === "CLIENTE" && (
              <>
                <button
                  onClick={() => navigate("/cliente/pedidos")}
                  style={styles.orangeBtn}
                >
                  Meus Pedidos
                </button>

                <button
                  onClick={() => navigate("/cliente/perfil")}
                  style={styles.orangeBtn}
                >
                  Meus Dados
                </button>
              </>
            )}

            {/* AGENTE */}
            {usuario.tipoUsuario === "AGENTE" && (
              <button
                onClick={() => navigate("/agente/dashboard")}
                style={styles.orangeBtn}
              >
                Dashboard
              </button>
            )}

            <button onClick={handleLogout} style={styles.logoutBtn}>
              Sair
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")} style={styles.primaryBtn}>
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "5px", // 🔥 CORRIGIDO (antes tava errado)
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 48px",
    background: "rgba(15,15,30,0.92)",
    backdropFilter: "blur(12px)",
    zIndex: 1000,
  },

  logo: {
    color: "#fff",
    fontWeight: 900,
    fontSize: 20,
    cursor: "pointer"
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  user: {
    color: "#ccc",
    fontSize: "14px",
    marginRight: "6px"
  },

  /* BOTÃO PRINCIPAL */
  primaryBtn: {
    padding: "12px 26px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    color: "#1a1a2e",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 14,
    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.35)",
  },

  /* 🔥 BOTÕES LARANJA (NOVO PADRÃO) */
  orangeBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg,#f59e0b,#f97316)",
    color: "#1a1a2e",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
    transition: "0.2s"
  },

  /* LOGOUT (mais discreto) */
  logoutBtn: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid #f97316",
    background: "transparent",
    color: "#f97316",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 13,
  },
  
  logoImg: {
  height: "34px",
  objectFit: "contain",
  cursor: "pointer"
},
};