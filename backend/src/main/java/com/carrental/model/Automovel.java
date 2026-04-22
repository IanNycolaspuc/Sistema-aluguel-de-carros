    package com.carrental.model;

    import com.carrental.enums.StatusAutomovel;
    import jakarta.persistence.*;
    import io.micronaut.serde.annotation.Serdeable;
    import java.math.BigDecimal;
    import java.util.Objects;

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
        private String urlImgAutomovel;

        @Enumerated(EnumType.STRING)
        private StatusAutomovel status;
        private BigDecimal valorDiaria;

        // GETTERS E SETTERS

        public String getUrlImgAutomovel() {
            return urlImgAutomovel;
        }

        public void setUrlImgAutomovel(String urlImgAutomovel) {
            this.urlImgAutomovel = urlImgAutomovel;
        }

        public Long getId() {
            return id;
        }

        public BigDecimal getValorDiaria() {
            return valorDiaria;
        }

        public void setValorDiaria(BigDecimal valorDiaria) {
            this.valorDiaria = valorDiaria;
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