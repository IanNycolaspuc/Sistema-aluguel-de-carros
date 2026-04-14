package com.carrental.controller;

import com.carrental.dto.UsuarioCreateDTO;
import com.carrental.model.Usuario;
import com.carrental.service.UsuarioService;
import io.micronaut.http.annotation.*;

import java.util.List;

@Controller("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @Post
    public Usuario criar(@Body UsuarioCreateDTO dto) {
        return service.criar(dto);
    }

    @Get
    public List<Usuario> listar() {
        return service.listarTodos();
    }

    @Get("/{id}")
    public Usuario buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }
}