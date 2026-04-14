package com.carrental.dto;

import io.micronaut.core.annotation.Introspected;
import com.carrental.enums.StatusPedido;

@Introspected
public class PedidoUpdateDTO {

    private StatusPedido status;
    private Long agenteId;

    public StatusPedido getStatus() {
        return status;
    }

    public void setStatus(StatusPedido status) {
        this.status = status;
    }

    public Long getAgenteId() {
        return agenteId;
    }

    public void setAgenteId(Long agenteId) {
        this.agenteId = agenteId;
    }
}