package com.carrental.model;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

/**
 * Representa a entidade empregadora e o rendimento auferido pelo cliente.
 * Conforme requisito: máximo 3 entidades empregadoras por cliente.
 */
@Serdeable
public class EntidadeEmpregadora {

    @NotBlank(message = "Nome da entidade empregadora é obrigatório")
    private String nome;

    @NotBlank(message = "CNPJ da entidade empregadora é obrigatório")
    private String cnpj;

    private String cargo;

    @Positive(message = "Rendimento deve ser um valor positivo")
    private BigDecimal rendimento;

    public EntidadeEmpregadora() {}

    public EntidadeEmpregadora(String nome, String cnpj, String cargo, BigDecimal rendimento) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.cargo = cargo;
        this.rendimento = rendimento;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public BigDecimal getRendimento() { return rendimento; }
    public void setRendimento(BigDecimal rendimento) { this.rendimento = rendimento; }
}
