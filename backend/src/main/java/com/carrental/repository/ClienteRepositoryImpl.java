package com.carrental.repository;

import com.carrental.exception.ClienteNaoEncontradoException;
import com.carrental.model.Cliente;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Singleton
public class ClienteRepositoryImpl implements ClienteRepository {

    private final EntityManager em;

    public ClienteRepositoryImpl(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional
    public Cliente salvar(Cliente cliente) {
        em.persist(cliente);
        return cliente;
    }

    @Override
    @Transactional
    public Cliente atualizar(Cliente cliente) {
        return em.merge(cliente);
    }

    @Override
    @Transactional
    public Optional<Cliente> buscarPorId(Long id) {
        return Optional.ofNullable(em.find(Cliente.class, id))
                       .filter(Cliente::isAtivo);
    }

    @Override
    @Transactional
    public Optional<Cliente> buscarPorCpf(String cpf) {
        return em.createQuery("SELECT c FROM Cliente c WHERE c.cpf = :cpf AND c.ativo = true", Cliente.class)
                .setParameter("cpf", cpf)
                .getResultStream()
                .findFirst();
    }

    @Override
    @Transactional
    public Optional<Cliente> buscarPorRg(String rg) {
        return em.createQuery("SELECT c FROM Cliente c WHERE c.rg = :rg AND c.ativo = true", Cliente.class)
                .setParameter("rg", rg)
                .getResultStream()
                .findFirst();
    }

    @Override
    @Transactional
    public List<Cliente> listarTodos() {
        return em.createQuery("SELECT c FROM Cliente c WHERE c.ativo = true ORDER BY c.nome", Cliente.class)
                .getResultList();
    }

    @Override
    @Transactional
    public List<Cliente> buscarPorNome(String nome) {
        return em.createQuery("SELECT c FROM Cliente c WHERE LOWER(c.nome) LIKE :nome AND c.ativo = true ORDER BY c.nome", Cliente.class)
                .setParameter("nome", "%" + nome.toLowerCase().trim() + "%")
                .getResultList();
    }

    @Override
    @Transactional
    public boolean deletar(Long id) {
        Cliente cliente = em.find(Cliente.class, id);
        if (cliente == null || !cliente.isAtivo()) return false;
        cliente.setAtivo(false);
        em.merge(cliente);
        return true;
    }

    @Override
    @Transactional
    public boolean existePorCpf(String cpf) {
        Long count = em.createQuery("SELECT COUNT(c) FROM Cliente c WHERE c.cpf = :cpf AND c.ativo = true", Long.class)
                .setParameter("cpf", cpf)
                .getSingleResult();
        return count > 0;
    }

    @Override
    @Transactional
    public boolean existePorRg(String rg) {
        Long count = em.createQuery("SELECT COUNT(c) FROM Cliente c WHERE c.rg = :rg AND c.ativo = true", Long.class)
                .setParameter("rg", rg)
                .getSingleResult();
        return count > 0;
    }
}