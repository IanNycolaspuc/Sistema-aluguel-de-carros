package com.carrental.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.time.LocalDate;

@Serdeable
public class PedidoCreateDTO {

    private Long clienteId;
    private Long automovelId;
    private Integer quantidadeDias;
    private String observacoes;

    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public Long getAutomovelId() { return automovelId; }
    public void setAutomovelId(Long automovelId) { this.automovelId = automovelId; }

    public Integer getQuantidadeDias() { return quantidadeDias; }
    public void setQuantidadeDias(Integer quantidadeDias) { this.quantidadeDias = quantidadeDias; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}