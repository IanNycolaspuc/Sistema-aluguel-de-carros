package com.carrental.model;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Serdeable
@Entity
@Table(name = "clientes")
public class Cliente extends Usuario {

    @NotBlank(message = "RG é obrigatório")
    @Size(min = 7, max = 14, message = "RG deve ter entre 7 e 14 caracteres")
    private String rg;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF deve estar no formato 000.000.000-00")
    private String cpf;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    @NotBlank(message = "Data de nascimento é obrigatória")
    private String dataNascimento;

    // 🔗 RELAÇÃO COM ENDEREÇO (como entidade)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id")
    @NotNull(message = "Endereço é obrigatório")
    @Valid
    private Endereco endereco;

    @NotBlank(message = "Profissão é obrigatória")
    private String profissao;

    
    @Transient
    @Valid
    @Size(max = 3, message = "Máximo de 3 entidades empregadoras permitidas")
    private List<EntidadeEmpregadora> entidadesEmpregadoras = new ArrayList<>();

    public Cliente() {
        super();
    }

    // ── Regras de Negócio ───────────────────────────────────

    public void adicionarEntidadeEmpregadora(EntidadeEmpregadora entidade) {
        if (this.entidadesEmpregadoras.size() >= 3) {
            throw new IllegalStateException(
                "Cliente já possui o máximo de 3 entidades empregadoras cadastradas."
            );
        }
        this.entidadesEmpregadoras.add(entidade);
    }

    public void removerEntidadeEmpregadora(int index) {
        if (index < 0 || index >= this.entidadesEmpregadoras.size()) {
            throw new IndexOutOfBoundsException("Índice inválido para entidade empregadora.");
        }
        this.entidadesEmpregadoras.remove(index);
    }

    // ── Getters e Setters ───────────────────────────────────

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(String dataNascimento) { this.dataNascimento = dataNascimento; }

    public Endereco getEndereco() { return endereco; }
    public void setEndereco(Endereco endereco) { this.endereco = endereco; }

    public String getProfissao() { return profissao; }
    public void setProfissao(String profissao) { this.profissao = profissao; }

    public List<EntidadeEmpregadora> getEntidadesEmpregadoras() {
        return entidadesEmpregadoras;
    }

    public void setEntidadesEmpregadoras(List<EntidadeEmpregadora> entidadesEmpregadoras) {
        if (entidadesEmpregadoras != null && entidadesEmpregadoras.size() > 3) {
            throw new IllegalArgumentException("Máximo de 3 entidades empregadoras permitidas.");
        }
        this.entidadesEmpregadoras = entidadesEmpregadoras != null ? entidadesEmpregadoras : new ArrayList<>();
    }
}