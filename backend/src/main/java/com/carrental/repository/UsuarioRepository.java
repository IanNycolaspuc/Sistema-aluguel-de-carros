package com.carrental.repository;

import com.carrental.model.Usuario;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Singleton
public class UsuarioRepository {

    private final EntityManager em;

    public UsuarioRepository(EntityManager em) {
        this.em = em;
    }

    @Transactional
    public Usuario salvar(Usuario usuario) {
        em.persist(usuario);
        return usuario;
    }

    @Transactional
    public Optional<Usuario> findByEmail(String email) {
        return em.createQuery("SELECT u FROM Usuario u WHERE u.email = :email", Usuario.class)
                .setParameter("email", email)
                .getResultStream()
                .findFirst();
    }

    @Transactional
    public List<Usuario> listarTodos() {
        return em.createQuery("SELECT u FROM Usuario u", Usuario.class)
                .getResultList();
    }

    @Transactional
    public Usuario buscarPorId(Long id) {
        return em.find(Usuario.class, id);
    }
}