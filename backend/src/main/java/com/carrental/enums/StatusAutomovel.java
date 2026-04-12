package com.carrental.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusAutomovel {
    DISPONIVEL,
    ALUGADO,
    MANUTENCAO;

    @JsonCreator
    public static StatusAutomovel fromString(String value) {
        if (value == null) return null;
        // Isso faz o sistema converter qualquer texto para MAIÚSCULO antes de validar
        return StatusAutomovel.valueOf(value.toUpperCase());
    }
}