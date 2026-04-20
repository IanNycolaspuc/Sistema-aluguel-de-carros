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

        // 🔹 transforma em MAP (id -> objeto)
        const clientesObj = {};
        clientesRes.data.forEach((c) => {
          clientesObj[c.id] = c;
        });

        const autosObj = {};
        autosRes.data.forEach((a) => {
          autosObj[a.id] = a;
        });

        setClientesMap(clientesObj);
        setAutomoveisMap(autosObj);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
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

          {/* CONTEÚDO */}
          {loading ? (
            <p style={styles.loading}>Carregando pedidos...</p>
          ) : pedidosFiltrados.length === 0 ? (
            <p style={styles.empty}>Nenhum pedido encontrado.</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Automóvel</th>
                    <th>Data</th>
                    <th>Fim</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {pedidosFiltrados.map((p) => {
                    const cliente = clientesMap[p.clienteId];
                    const auto = automoveisMap[p.automovelId];

                    return (
                      <tr key={p.id}>
                        <td>{p.id}</td>

                        {/* CLIENTE MELHORADO */}
                        <td>
                          {cliente ? (
                            <div style={styles.clienteBox}>
                              <strong>{cliente.nome}</strong>
                              <span style={styles.subInfo}>
                                {cliente.profissao}
                              </span>
                              <span style={styles.subInfo}>
                                {cliente.telefone}
                              </span>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>

                        {/* AUTOMÓVEL MELHORADO */}
                        <td>
                          {auto ? (
                            <div style={styles.autoBox}>
                              <strong>
                                {auto.marca} {auto.modelo}
                              </strong>
                              <span style={styles.subInfo}>
                                {auto.ano} • {auto.placa}
                              </span>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>

                        <td>{formatarData(p.dataSolicitacao)}</td>
                        <td>{formatarData(p.dataFimPretendida)}</td>

                        <td>
                          {p.valorPrevisto != null
                            ? `R$ ${p.valorPrevisto}`
                            : "—"}
                        </td>

                        <td>
                          <StatusBadge status={p.status} />
                        </td>

                        <td>
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
    maxWidth: "1100px",
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
    fontSize: "24px",
    fontWeight: 800,
    color: "#1a1a2e",
    margin: 0,
  },

  backBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
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
    fontSize: "13px",
  },

  filterActive: {
    background: "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)",
    border: "none",
    fontWeight: 700,
  },

  tableWrapper: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  table: {
    width: "100%",
    fontSize: "14px",
  },

  viewBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },

  clienteBox: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  autoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  subInfo: {
    fontSize: "12px",
    color: "#6b7280",
  },

  loading: {
    textAlign: "center",
    color: "#6b7280",
  },

  empty: {
    textAlign: "center",
    color: "#6b7280",
  },
};