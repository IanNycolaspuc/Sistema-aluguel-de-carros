package com.carrental.repository;

import com.carrental.model.Cliente;

import java.util.List;
import java.util.Optional;

/**
 * Interface do repositório de Cliente.
 * Define o contrato de persistência, permitindo diferentes implementações
 * (em memória, JPA, JDBC, etc.) sem alterar as camadas superiores.
 */
public interface ClienteRepository {

    /**
     * Persiste um novo cliente.
     *
     * @param cliente Cliente a ser salvo
     * @return Cliente salvo com ID gerado
     */
    Cliente salvar(Cliente cliente);

    /**
     * Atualiza um cliente existente.
     *
     * @param cliente Cliente com dados atualizados
     * @return Cliente atualizado
     * @throws com.carrental.exception.ClienteNaoEncontradoException se não encontrado
     */
    Cliente atualizar(Cliente cliente);

    /**
     * Busca cliente pelo ID.
     *
     * @param id Identificador único
     * @return Optional com o cliente, ou vazio se não encontrado
     */
    Optional<Cliente> buscarPorId(Long id);

    /**
     * Busca cliente pelo CPF.
     *
     * @param cpf CPF no formato 000.000.000-00
     * @return Optional com o cliente, ou vazio se não encontrado
     */
    Optional<Cliente> buscarPorCpf(String cpf);

    /**
     * Busca cliente pelo RG.
     *
     * @param rg RG do cliente
     * @return Optional com o cliente, ou vazio se não encontrado
     */
    Optional<Cliente> buscarPorRg(String rg);

    /**
     * Lista todos os clientes ativos.
     *
     * @return Lista de clientes ativos
     */
    List<Cliente> listarTodos();

    /**
     * Busca clientes pelo nome (pesquisa parcial, case-insensitive).
     *
     * @param nome Texto a ser buscado no nome
     * @return Lista de clientes cujo nome contém o texto fornecido
     */
    List<Cliente> buscarPorNome(String nome);

    /**
     * Remove logicamente um cliente (marca como inativo).
     *
     * @param id ID do cliente a ser inativado
     * @return true se o cliente foi encontrado e inativado; false caso contrário
     */
    boolean deletar(Long id);

    /**
     * Verifica se já existe um cliente com o CPF informado.
     *
     * @param cpf CPF a verificar
     * @return true se CPF já está cadastrado
     */
    boolean existePorCpf(String cpf);

    /**
     * Verifica se já existe um cliente com o RG informado.
     *
     * @param rg RG a verificar
     * @return true se RG já está cadastrado
     */
    boolean existePorRg(String rg);
}
