package com.carrental.service;

import com.carrental.dto.auth.LoginRequestDTO;
import com.carrental.dto.auth.LoginResponseDTO;
import com.carrental.model.Usuario;
import com.carrental.repository.UsuarioRepository;
import jakarta.inject.Singleton;

@Singleton
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

    Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
        .orElse(null);

    if (usuario == null) {
        System.out.println("❌ Usuário NÃO encontrado no banco");
        throw new RuntimeException("Usuário não encontrado");
    }

    System.out.println("✅ Usuário encontrado: " + usuario.getEmail());
    System.out.println("Senha banco: " + usuario.getSenha());
    System.out.println("Senha enviada: " + request.getSenha());

    
    if (!usuario.getSenha().equals(request.getSenha())) {
        System.out.println("❌ Senha inválida");
        throw new RuntimeException("Senha inválida");
    }

    return new LoginResponseDTO(
        usuario.getId(),
        usuario.getNome(),
        usuario.getEmail(),
        usuario.getTipoUsuario()
    );
}
}