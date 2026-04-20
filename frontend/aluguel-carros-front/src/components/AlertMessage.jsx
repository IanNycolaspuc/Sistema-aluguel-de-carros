import React, { useEffect } from "react";

export default function AlertMessage({
  type = "success",
  message,
  onClose,
  duration = 3000,
}) {
  const colors = {
    success: {
      background: "#dcfce7",
      border: "#22c55e",
      text: "#166534",
    },
    error: {
      background: "#fee2e2",
      border: "#ef4444",
      text: "#991b1b",
    },
    warning: {
      background: "#fef9c3",
      border: "#eab308",
      text: "#854d0e",
    },
  };

  const style = colors[type] || colors.success;

  // auto fechar
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.toast,
          background: style.background,
          border: `1px solid ${style.border}`,
          color: style.text,
        }}
      >
        <span>{message}</span>

        <button onClick={onClose} style={styles.close}>
          ✕
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: "40px",
    right: "20px",
    zIndex: 9999,
  },

  toast: {
    minWidth: "280px",
    maxWidth: "350px",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    animation: "slideIn 0.3s ease",
  },

  close: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};