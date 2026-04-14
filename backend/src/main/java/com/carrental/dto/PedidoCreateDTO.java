package com.carrental.dto;

import io.micronaut.core.annotation.Introspected;
import java.time.LocalDate;

@Introspected
public class PedidoCreateDTO {

    private Long clienteId;
    private Long automovelId;
    private LocalDate dataFimPretendida;
    private String observacoes;

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public Long getAutomovelId() {
        return automovelId;
    }

    public void setAutomovelId(Long automovelId) {
        this.automovelId = automovelId;
    }

    public LocalDate getDataFimPretendida() {
        return dataFimPretendida;
    }

    public void setDataFimPretendida(LocalDate dataFimPretendida) {
        this.dataFimPretendida = dataFimPretendida;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}