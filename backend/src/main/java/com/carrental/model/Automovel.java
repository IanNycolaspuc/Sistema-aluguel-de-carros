package com.carrental.model;

import com.carrental.enums.StatusAutomovel;
import jakarta.persistence.*;
import io.micronaut.serde.annotation.Serdeable;

@Serdeable
@Entity
public class Automovel {

    @Id
    @GeneratedValue
    private Long id;

    private String marca;
    private String modelo;
    private int ano;
    private String placa;
    private String matricula;

    @Enumerated(EnumType.STRING)
    private StatusAutomovel status;

    // GETTERS E SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public StatusAutomovel getStatus() {
        return status;
    }

    public void setStatus(StatusAutomovel status) {
        this.status = status;
    }
    public String getMatricula() {
    return matricula;
}

public void setMatricula(String matricula) {
    this.matricula = matricula;
}
}