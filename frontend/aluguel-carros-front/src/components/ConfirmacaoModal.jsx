import { useState } from 'react'

// Componente de modal de confirmação com campo de observação opcional
// Props:
//   aberto          boolean
//   titulo          string
//   descricao       string (opcional)
//   labelObs        string (opcional) — exibe textarea se passado
//   obsObrigatoria  boolean (default false)
//   corConfirmar    string cor do botão confirmar (default azul)
//   textoConfirmar  string
//   onConfirmar     (obs: string) => void
//   onCancelar      () => void

export default function ConfirmacaoModal({
  aberto,
  titulo,
  descricao,
  labelObs,
  obsObrigatoria = false,
  corConfirmar = '#185FA5',
  textoConfirmar = 'Confirmar',
  onConfirmar,
  onCancelar,
}) {
  const [obs, setObs] = useState('')

  if (!aberto) return null

  function handleConfirmar() {
    if (obsObrigatoria && !obs.trim()) {
      alert('O campo de observação é obrigatório.')
      return
    }
    onConfirmar(obs.trim())
    setObs('')
  }

  function handleCancelar() {
    setObs('')
    onCancelar()
  }

  return (
    <div style={s.overlay} onClick={handleCancelar}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        <h3 style={s.titulo}>{titulo}</h3>

        {descricao && <p style={s.descricao}>{descricao}</p>}

        {labelObs && (
          <div style={s.group}>
            <label style={s.label}>
              {labelObs}
              {obsObrigatoria && <span style={{ color: '#ef4444' }}> *</span>}
            </label>
            <textarea
              style={s.textarea}
              placeholder="Digite aqui..."
              rows={3}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
            />
          </div>
        )}

        <div style={s.botoes}>
          <button style={s.cancelar} onClick={handleCancelar}>
            Cancelar
          </button>
          <button
            style={{ ...s.confirmar, background: corConfirmar }}
            onClick={handleConfirmar}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}

const s = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  titulo: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#1a1a2e',
    margin: 0,
  },
  descricao: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
  },
  textarea: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
  },
  botoes: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '4px',
  },
  cancelar: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
  },
  confirmar: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '14px',
  },
}
