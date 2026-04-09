package com.carrental.repository;

import com.carrental.model.Usuario;
import jakarta.inject.Singleton;

import java.util.*;

@Singleton
public class UsuarioRepository {

    private final Map<Long, Usuario> banco = new HashMap<>();
    private Long sequence = 1L;

    public Usuario salvar(Usuario usuario) {
        usuario.setId(sequence++);
        banco.put(usuario.getId(), usuario);
        return usuario;
    }

    public Optional<Usuario> findByEmail(String email) {
        return banco.values().stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst();
    }

    public List<Usuario> listar() {
        return new ArrayList<>(banco.values());
    }
}