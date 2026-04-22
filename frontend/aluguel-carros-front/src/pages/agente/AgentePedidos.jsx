import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPedidos } from "../../service/agenteService";
import StatusBadge from "../../components/StatusBadge";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";

const STATUS_OPCOES = [
  "TODOS",
  "PENDENTE",
  "EM_ANALISE",
  "APROVADO",
  "REJEITADO",
  "CANCELADO",
  "CONVERTIDO_EM_CONTRATO",
];

export default function AgentePedidos() {
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);
  const [clientesMap, setClientesMap] = useState({});
  const [automoveisMap, setAutomoveisMap] = useState({});

  const [filtro, setFiltro] = useState("TODOS");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [pedidosRes, clientesRes, autosRes] = await Promise.all([
          listarPedidos(),
          axios.get("http://localhost:8080/clientes"),
          axios.get("http://localhost:8080/automoveis"),
        ]);

        setPedidos(pedidosRes.data);

        const clientesObj = {};
        clientesRes.data.forEach((c) => (clientesObj[c.id] = c));

        const autosObj = {};
        autosRes.data.forEach((a) => (autosObj[a.id] = a));

        setClientesMap(clientesObj);
        setAutomoveisMap(autosObj);
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const pedidosFiltrados =
    filtro === "TODOS"
      ? pedidos
      : pedidos.filter((p) => p.status === filtro);

  const formatarData = (data) =>
    data ? new Date(data).toLocaleDateString("pt-BR") : "—";

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        <div style={styles.container}>

          {/* TOPO */}
          <div style={styles.top}>
            <button
              onClick={() => navigate("/agente/dashboard")}
              style={styles.backBtn}
            >
              ← Voltar
            </button>

            <h1 style={styles.title}>Pedidos de Aluguel</h1>
          </div>

          {/* FILTROS */}
          <div style={styles.filters}>
            {STATUS_OPCOES.map((s) => (
              <button
                key={s}
                onClick={() => setFiltro(s)}
                style={{
                  ...styles.filterBtn,
                  ...(filtro === s ? styles.filterActive : {}),
                }}
              >
                {s === "TODOS" ? "Todos" : <StatusBadge status={s} />}
              </button>
            ))}
          </div>

          {/* TABELA */}
          {loading ? (
            <p style={styles.loading}>Carregando...</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thead}>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Automóvel</th>
                    <th>Período</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {pedidosFiltrados.map((p, index) => {
                    const cliente = clientesMap[p.clienteId];
                    const auto = automoveisMap[p.automovelId];

                    return (
                      <tr
                        key={p.id}
                        style={{
                          ...styles.row,
                          background:
                            index % 2 === 0 ? "#fff" : "#f9fafb",
                        }}
                      >
                        <td style={styles.cell}>{p.id}</td>

                        <td style={styles.cell}>
                          {cliente && (
                            <div style={styles.infoBox}>
                              <strong>{cliente.nome}</strong>
                              <span>{cliente.profissao}</span>
                              <span>{cliente.telefone}</span>
                            </div>
                          )}
                        </td>

                        <td style={styles.cell}>
                          {auto && (
                            <div style={styles.infoBox}>
                              <strong>
                                {auto.marca} {auto.modelo}
                              </strong>
                              <span>
                                {auto.ano} • {auto.placa}
                              </span>
                            </div>
                          )}
                        </td>

                        <td style={styles.cell}>
                          <div style={styles.infoBox}>
                            <span>{formatarData(p.dataSolicitacao)}</span>
                            <span>{formatarData(p.dataFimPretendida)}</span>
                          </div>
                        </td>

                        <td style={styles.cell}>
                          {p.valorPrevisto
                            ? `R$ ${p.valorPrevisto}`
                            : "—"}
                        </td>

                        <td style={styles.cell}>
                          <StatusBadge status={p.status} />
                        </td>

                        <td style={styles.cell}>
                          <button
                            onClick={() =>
                              navigate(`/agente/pedidos/${p.id}`)
                            }
                            style={styles.viewBtn}
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
    padding: "40px 20px",
    background: "linear-gradient(135deg,#f1f5f9,#e0f2fe)",
  },

  container: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  top: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  title: {
    fontSize: "26px",
    fontWeight: 800,
    color: "#1a1a2e",
  },

  backBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
  },

  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  filterBtn: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
  },

  filterActive: {
    background: "linear-gradient(135deg,#f59e0b,#f97316)",
    border: "none",
    fontWeight: 700,
  },

  tableWrapper: {
    background: "#fff",
    borderRadius: "12px", // 🔥 menos arredondado
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse", // 🔥 importante pra linhas
  },

  thead: {
    background: "#eef2f7", // 🔥 mais contraste
  },

  row: {
    transition: "0.15s",
  },

  /* 🔥 ZEBRA MAIS FORTE */
  rowEven: {
    background: "#ffffff",
  },

  rowOdd: {
    background: "#f1f5f9", // 🔥 mais visível que antes
  },

  cell: {
    padding: "14px 16px",
    borderBottom: "1px solid #e5e7eb", // 🔥 linha horizontal
    borderRight: "1px solid #f1f5f9", // 🔥 linha vertical leve
    verticalAlign: "top",
  },

  /* 🔥 REMOVE borda da última coluna */
  lastCell: {
    borderRight: "none",
  },

  infoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    fontSize: "13px",
  },

  viewBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s",
  },

  loading: {
    textAlign: "center",
    color: "#6b7280",
  },
};
