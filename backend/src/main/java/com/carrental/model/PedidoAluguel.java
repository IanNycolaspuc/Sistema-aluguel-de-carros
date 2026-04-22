package com.carrental.model;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
import com.carrental.enums.StatusPedido;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Serdeable
@Entity
@Table(name = "pedidos")
public class PedidoAluguel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clienteId;
    private Long automovelId;

    private LocalDateTime dataSolicitacao;
    private LocalDate dataFimPretendida;
    private Integer quantidadeDias;

    private BigDecimal valorPrevisto;

    // Observações do cliente (preenchida na criação do pedido)
    private String observacoes;

    // Observações do agente (motivo de aprovação, rejeição, etc.)
    private String observacoesAgente;

    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    private Long agenteId;

    public PedidoAluguel() {
        this.status = StatusPedido.PENDENTE;
        this.dataSolicitacao = LocalDateTime.now();
    }

    // Getters e Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public Long getAutomovelId() { return automovelId; }
    public void setAutomovelId(Long automovelId) { this.automovelId = automovelId; }

    public LocalDateTime getDataSolicitacao() { return dataSolicitacao; }

    public LocalDate getDataFimPretendida() { return dataFimPretendida; }
    public void setDataFimPretendida(LocalDate dataFimPretendida) { this.dataFimPretendida = dataFimPretendida; }

    public Integer getQuantidadeDias() { return quantidadeDias; }
    public void setQuantidadeDias(Integer quantidadeDias) { this.quantidadeDias = quantidadeDias; }

    public BigDecimal getValorPrevisto() { return valorPrevisto; }
    public void setValorPrevisto(BigDecimal valorPrevisto) { this.valorPrevisto = valorPrevisto; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public String getObservacoesAgente() { return observacoesAgente; }
    public void setObservacoesAgente(String observacoesAgente) { this.observacoesAgente = observacoesAgente; }

    public StatusPedido getStatus() { return status; }
    public void setStatus(StatusPedido status) { this.status = status; }

    public Long getAgenteId() { return agenteId; }
    public void setAgenteId(Long agenteId) { this.agenteId = agenteId; }
}
