package com.carrental.dto;

import com.carrental.model.Endereco;
import com.carrental.model.EntidadeEmpregadora;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

/**
 * DTO (Data Transfer Object) para criação e atualização de Cliente.
 * Desacopla a camada de apresentação/transporte da entidade de domínio.
 */
@Serdeable
public class ClienteDTO {

    @NotBlank(message = "RG é obrigatório")
    private String rg;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF deve estar no formato 000.000.000-00")
    private String cpf;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 150)
    private String nome;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @NotBlank(message = "Data de nascimento é obrigatória")
    private String dataNascimento;

    @NotNull(message = "Endereço é obrigatório")
    @Valid
    private Endereco endereco;

    @NotBlank(message = "Profissão é obrigatória")
    private String profissao;

    @Size(max = 3, message = "Máximo de 3 entidades empregadoras")
    @Valid
    private List<EntidadeEmpregadora> entidadesEmpregadoras = new ArrayList<>();

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, max = 100)
    private String senha;

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public ClienteDTO() {}

    // Getters e Setters
    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public Endereco getEndereco() { return endereco; }
    public void setEndereco(Endereco endereco) { this.endereco = endereco; }

    public String getProfissao() { return profissao; }
    public void setProfissao(String profissao) { this.profissao = profissao; }

    public List<EntidadeEmpregadora> getEntidadesEmpregadoras() { return entidadesEmpregadoras; }
    public void setEntidadesEmpregadoras(List<EntidadeEmpregadora> entidades) {
        this.entidadesEmpregadoras = entidades != null ? entidades : new ArrayList<>();
    }
}
