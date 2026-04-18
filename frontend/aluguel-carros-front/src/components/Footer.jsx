import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={styles.footer}>
      
      <div style={styles.grid}>

        {/* COLUNA 1 */}
        <div>
          <div style={styles.brand}>🚘 CIEL Cars</div>
          <div style={styles.links}>
            <span style={styles.link}>Simulador de tarifa</span>
            <span style={styles.link}>Locadoras de carros</span>
            <span style={styles.link}>Cidades de retirada</span>
            <span style={styles.link}>Aeroportos de retirada</span>
            <span style={styles.link}>Promoções</span>
            <span style={styles.link}>Blog CIEL Cars</span>
          </div>
        </div>

        {/* COLUNA 2 */}
        <div>
          <div style={styles.title}>Locadoras de veículos</div>
          <div style={styles.links}>
            <span style={styles.link}>Cadastre sua locadora</span>
            <span style={styles.link}>Faça parte do programa</span>
          </div>
        </div>

        {/* COLUNA 3 */}
        <div>
          <div style={styles.title}>Sobre nós</div>
          <div style={styles.links}>
            <span style={styles.link} onClick={() => navigate("/sobre")}>Sobre a CIEL Cars</span>
            <span style={styles.link}>Política de Privacidade</span>
            <span style={styles.link}>Política de Cookies</span>
            <span style={styles.link}>Termos e Condições</span>
            <span style={styles.link}>Código de Conduta</span>
            <span style={styles.link}>Carreiras</span>
          </div>
        </div>

        {/* COLUNA 4 */}
        <div>
          <div style={styles.title}>Suporte ao cliente</div>
          <div style={styles.links}>
            <span style={styles.link} onClick={() => navigate("/contatoEmail")}>Entre em contato</span>
            <span style={styles.link}>Gerenciar minha reserva</span>
            <span style={styles.link}>Central de ajuda</span>
            <span style={styles.link}>Questões frequentes</span>
            <span style={styles.link}>Recursos para viajantes</span>
            <span style={styles.link}>Melhor Preço Garantido</span>
          </div>
        </div>

      </div>

      <div style={styles.bottom}>
        © 2026 CIEL Cars • Todos os direitos reservados
      </div>

    </footer>
  );
}

const styles = {
  footer: {
    background: "#1a1a2e",
    color: "#fff",
    padding: "48px 60px 20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
    gap: "32px",
    marginBottom: "40px"
  },

  brand: {
    fontWeight: 900,
    fontSize: "18px",
    marginBottom: "12px"
  },

  title: {
    fontWeight: 700,
    marginBottom: "12px"
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  link: {
    color: "#94a3b8",
    fontSize: "13px",
    cursor: "pointer",
    transition: "0.2s"
  },

  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "20px",
    color: "#64748b",
    fontSize: "13px",
    textAlign: "center"
  }
};