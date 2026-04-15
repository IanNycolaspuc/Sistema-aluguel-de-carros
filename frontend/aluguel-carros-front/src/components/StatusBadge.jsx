const config = {
  PENDENTE:               { label: 'Pendente',                cor: 'warning'  },
  EM_ANALISE:             { label: 'Em Análise',              cor: 'info'     },
  APROVADO:               { label: 'Aprovado',                cor: 'success'  },
  REJEITADO:              { label: 'Rejeitado',               cor: 'danger'   },
  CANCELADO:              { label: 'Cancelado',               cor: 'secondary'},
  CONVERTIDO_EM_CONTRATO: { label: 'Convertido em Contrato',  cor: 'primary'  },
}

export default function StatusBadge({ status }) {
  const s = config[status] || { label: status, cor: 'secondary' }
  return (
    <span className={`badge bg-${s.cor}`}>{s.label}</span>
  )
}
