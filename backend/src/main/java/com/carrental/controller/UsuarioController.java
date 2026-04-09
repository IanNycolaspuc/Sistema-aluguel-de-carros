package com.carrental.controller;

import com.carrental.dto.UsuarioCreateDTO;
import com.carrental.model.Usuario;
import com.carrental.service.UsuarioService;
import io.micronaut.http.annotation.*;

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
}
