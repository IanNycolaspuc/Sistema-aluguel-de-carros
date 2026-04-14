package com.carrental.service;

import com.carrental.dto.UsuarioCreateDTO;
import com.carrental.enums.TipoUsuario;
import com.carrental.model.Usuario;
import com.carrental.repository.UsuarioRepository;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario criar(UsuarioCreateDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenha(dto.getSenha());
        usuario.setTipoUsuario(TipoUsuario.valueOf(dto.getTipoUsuario()));
        return repository.salvar(usuario);
    }

    public List<Usuario> listarTodos() {
        return repository.listarTodos();
    }

    public Usuario buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
}