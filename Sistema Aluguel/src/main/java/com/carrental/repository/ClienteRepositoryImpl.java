package com.carrental.repository;

import com.carrental.exception.ClienteNaoEncontradoException;
import com.carrental.model.Cliente;
import jakarta.inject.Singleton;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Implementação em memória do repositório de Cliente.
 *
 * Utiliza ConcurrentHashMap para garantir thread-safety em ambiente
 * multithread do servidor Netty do Micronaut.
 *
 * Em produção, esta classe deve ser substituída por uma implementação
 * com Micronaut Data (JPA/JDBC) anotada com @Repository.
 */
@Singleton
public class ClienteRepositoryImpl implements ClienteRepository {

    private final Map<Long, Cliente> storage = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(1);

    @Override
    public Cliente salvar(Cliente cliente) {
        Long id = sequence.getAndIncrement();
        cliente.setId(id);
        cliente.setDataCadastro(LocalDateTime.now());
        cliente.setDataAtualizacao(LocalDateTime.now());
        cliente.setAtivo(true);
        storage.put(id, cliente);
        return cliente;
    }

    @Override
    public Cliente atualizar(Cliente cliente) {
        if (!storage.containsKey(cliente.getId())) {
            throw new ClienteNaoEncontradoException(
                "Cliente com ID " + cliente.getId() + " não encontrado."
            );
        }
        cliente.setDataAtualizacao(LocalDateTime.now());
        storage.put(cliente.getId(), cliente);
        return cliente;
    }

    @Override
    public Optional<Cliente> buscarPorId(Long id) {
        return Optional.ofNullable(storage.get(id))
                       .filter(Cliente::isAtivo);
    }

    @Override
    public Optional<Cliente> buscarPorCpf(String cpf) {
        return storage.values().stream()
                .filter(Cliente::isAtivo)
                .filter(c -> c.getCpf().equals(cpf))
                .findFirst();
    }

    @Override
    public Optional<Cliente> buscarPorRg(String rg) {
        return storage.values().stream()
                .filter(Cliente::isAtivo)
                .filter(c -> c.getRg().equals(rg))
                .findFirst();
    }

    @Override
    public List<Cliente> listarTodos() {
        return storage.values().stream()
                .filter(Cliente::isAtivo)
                .sorted(Comparator.comparing(Cliente::getNome))
                .collect(Collectors.toList());
    }

    @Override
    public List<Cliente> buscarPorNome(String nome) {
        String termoBusca = nome.toLowerCase().trim();
        return storage.values().stream()
                .filter(Cliente::isAtivo)
                .filter(c -> c.getNome().toLowerCase().contains(termoBusca))
                .sorted(Comparator.comparing(Cliente::getNome))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deletar(Long id) {
        Cliente cliente = storage.get(id);
        if (cliente == null || !cliente.isAtivo()) {
            return false;
        }
        // Exclusão lógica: mantém o registro mas marca como inativo
        cliente.setAtivo(false);
        cliente.setDataAtualizacao(LocalDateTime.now());
        storage.put(id, cliente);
        return true;
    }

    @Override
    public boolean existePorCpf(String cpf) {
        return storage.values().stream()
                .filter(Cliente::isAtivo)
                .anyMatch(c -> c.getCpf().equals(cpf));
    }

    @Override
    public boolean existePorRg(String rg) {
        return storage.values().stream()
                .filter(Cliente::isAtivo)
                .anyMatch(c -> c.getRg().equals(rg));
    }
}
