package com.carrental.controller;

import com.carrental.dto.PedidoCreateDTO;
import com.carrental.model.PedidoAluguel;
import com.carrental.service.PedidoService;
import io.micronaut.http.annotation.*;

import java.util.List;

@Controller("/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    
    @Post
    public PedidoAluguel criar(@Body PedidoCreateDTO dto) {
        return service.criar(dto);
    }

   
    @Get("/cliente/{clienteId}")
    public List<PedidoAluguel> listarCliente(Long clienteId) {
        return service.listarPorCliente(clienteId);
    }

    
    @Get
    public List<PedidoAluguel> listarTodos() {
        return service.listarTodos();
    }

    
    @Put("/{id}/aprovar")
    public void aprovar(Long id, @QueryValue Long agenteId) {
        service.aprovar(id, agenteId);
    }

    
    @Put("/{id}/rejeitar")
    public void rejeitar(Long id, @QueryValue Long agenteId) {
        service.rejeitar(id, agenteId);
    }

   
    @Put("/{id}/cancelar")
    public void cancelar(Long id) {
        service.cancelar(id);
    }
}