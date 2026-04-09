package com.carrental.service;

import com.carrental.dto.ClienteDTO;
import com.carrental.model.Cliente;

import java.util.List;

/**
 * Interface de serviço para operações de negócio relacionadas ao Cliente.
 * Centraliza as regras de negócio e orquestra chamadas ao repositório.
 */
public interface ClienteService {

    /**
     * Cadastra um novo cliente.
     * Valida unicidade de CPF e RG antes de persistir.
     *
     * @param dto Dados do cliente a ser cadastrado
     * @return Cliente cadastrado com ID gerado
     * @throws com.carrental.exception.ClienteDuplicadoException se CPF ou RG já existir
     */
    Cliente cadastrar(ClienteDTO dto);

    /**
     * Atualiza os dados de um cliente existente.
     *
     * @param id  ID do cliente a ser atualizado
     * @param dto Novos dados do cliente
     * @return Cliente atualizado
     * @throws com.carrental.exception.ClienteNaoEncontradoException se cliente não existir
     */
    Cliente atualizar(Long id, ClienteDTO dto);

    /**
     * Busca um cliente pelo ID.
     *
     * @param id Identificador
     * @return Cliente encontrado
     * @throws com.carrental.exception.ClienteNaoEncontradoException se cliente não existir
     */
    Cliente buscarPorId(Long id);

    /**
     * Lista todos os clientes ativos, ordenados por nome.
     *
     * @return Lista de clientes
     */
    List<Cliente> listarTodos();

    /**
     * Pesquisa clientes pelo nome (busca parcial, case-insensitive).
     *
     * @param nome Termo de busca
     * @return Lista de clientes correspondentes
     */
    List<Cliente> buscarPorNome(String nome);

    /**
     * Realiza exclusão lógica do cliente.
     *
     * @param id ID do cliente a ser removido
     * @throws com.carrental.exception.ClienteNaoEncontradoException se cliente não existir
     */
    void deletar(Long id);
}
