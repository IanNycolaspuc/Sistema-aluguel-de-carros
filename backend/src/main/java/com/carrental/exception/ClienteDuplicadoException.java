package com.carrental.exception;

/**
 * Exceção lançada quando se tenta cadastrar um cliente com CPF ou RG já existente.
 */
public class ClienteDuplicadoException extends RuntimeException {

    public enum TipoDuplicidade {
        CPF, RG
    }

    private final TipoDuplicidade tipo;
    private final String valor;

    public ClienteDuplicadoException(TipoDuplicidade tipo, String valor) {
        super("Já existe um cliente cadastrado com " + tipo.name() + ": " + valor);
        this.tipo = tipo;
        this.valor = valor;
    }

    public TipoDuplicidade getTipo() { return tipo; }
    public String getValor() { return valor; }
}
