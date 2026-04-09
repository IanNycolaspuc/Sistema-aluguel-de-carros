package com.carrental.exception;

/**
 * Exceção lançada quando um cliente não é encontrado no sistema.
 */
public class ClienteNaoEncontradoException extends RuntimeException {

    private final Object identificador;

    public ClienteNaoEncontradoException(String mensagem) {
        super(mensagem);
        this.identificador = null;
    }

    public ClienteNaoEncontradoException(Long id) {
        super("Cliente com ID " + id + " não encontrado.");
        this.identificador = id;
    }

    public Object getIdentificador() {
        return identificador;
    }
}
