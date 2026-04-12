package com.carrental.controller;

import com.carrental.model.Automovel;
import com.carrental.service.AutomovelService;
import io.micronaut.http.annotation.*;

import java.util.List;

@Controller("/automoveis")
public class AutomovelController {

    private final AutomovelService service;

    public AutomovelController(AutomovelService service) {
        this.service = service;
    }

    // Cadastro
    @Post
    public Automovel cadastrar(@Body Automovel automovel) {
        return service.salvar(automovel);
    }

    // Listagem
    @Get
    public List<Automovel> listar() {
        return service.listar();
    }

    // Consulta por ID
    @Get("/{id}")
    public Automovel buscar(Long id) {
        return service.buscarPorId(id).orElse(null);
    }

    // Edição
    @Put("/{id}")
    public Automovel editar(Long id, @Body Automovel automovel) {
        return service.atualizar(id, automovel);
    }

    // Disponíveis
    @Get("/disponiveis")
    public List<Automovel> disponiveis() {
        return service.disponiveis();
    }
}