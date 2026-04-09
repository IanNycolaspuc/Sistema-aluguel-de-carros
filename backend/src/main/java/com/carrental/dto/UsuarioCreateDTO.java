package com.carrental.dto;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public class UsuarioCreateDTO {

    private String nome;
    private String email;
    private String senha;
    private String tipoUsuario;

    // getters e setters

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getTipoUsuario() { return tipoUsuario; }
    public void setTipoUsuario(String tipoUsuario) { this.tipoUsuario = tipoUsuario; }
}