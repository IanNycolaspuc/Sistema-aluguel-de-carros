package com.carrental.repository;

import com.carrental.model.PedidoAluguel;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Singleton
public class PedidoRepository {

    private final EntityManager em;

    public PedidoRepository(EntityManager em) {
        this.em = em;
    }

    @Transactional
    public PedidoAluguel salvar(PedidoAluguel pedido) {
        em.persist(pedido);
        return pedido;
    }

    @Transactional
    public Optional<PedidoAluguel> buscarPorId(Long id) {
        return Optional.ofNullable(em.find(PedidoAluguel.class, id));
    }

    @Transactional
    public List<PedidoAluguel> listarPorCliente(Long clienteId) {
        return em.createQuery("SELECT p FROM PedidoAluguel p WHERE p.clienteId = :clienteId", PedidoAluguel.class)
                .setParameter("clienteId", clienteId)
                .getResultList();
    }

    @Transactional
    public List<PedidoAluguel> listarTodos() {
        return em.createQuery("SELECT p FROM PedidoAluguel p", PedidoAluguel.class)
                .getResultList();
    }

    @Transactional
    public void atualizar(PedidoAluguel pedido) {
        em.merge(pedido);
    }
}