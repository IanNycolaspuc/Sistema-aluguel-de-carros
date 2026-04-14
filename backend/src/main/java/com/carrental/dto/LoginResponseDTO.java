package com.carrental.dto;

import com.carrental.enums.TipoUsuario;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable

public class LoginResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;

    public LoginResponseDTO() {}

    public LoginResponseDTO(Long id, String nome, String email, TipoUsuario tipoUsuario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }
}