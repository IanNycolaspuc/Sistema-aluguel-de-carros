package com.carrental.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable

public class LoginRequestDTO {

    private String email;
    private String senha;

    public LoginRequestDTO() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}