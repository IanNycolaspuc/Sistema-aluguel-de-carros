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

    @Get("/{id}")
    public PedidoAluguel buscar(Long id) {
        return service.buscarPorId(id).orElse(null);
    }

    // ── Ações principais ────────────────────────────────────────────────────

    @Put("/{id}/analisar")
    public void analisar(Long id,
                         @QueryValue Long agenteId,
                         @QueryValue(defaultValue = "") String observacoesAgente) {
        service.analisar(id, agenteId, observacoesAgente);
    }

    @Put("/{id}/aprovar")
    public void aprovar(Long id,
                        @QueryValue Long agenteId,
                        @QueryValue(defaultValue = "") String observacoesAgente) {
        service.aprovar(id, agenteId, observacoesAgente);
    }

    @Put("/{id}/rejeitar")
    public void rejeitar(Long id,
                         @QueryValue Long agenteId,
                         @QueryValue(defaultValue = "") String observacoesAgente) {
        service.rejeitar(id, agenteId, observacoesAgente);
    }

    @Put("/{id}/cancelar")
    public void cancelar(Long id) {
        service.cancelar(id);
    }

    @Put("/{id}/converter-contrato")
    public void converterContrato(Long id,
                                  @QueryValue Long agenteId,
                                  @QueryValue(defaultValue = "") String observacoesAgente) {
        service.converterEmContrato(id, agenteId, observacoesAgente);
    }

    // ── Reverter / Desfazer ─────────────────────────────────────────────────

    @Put("/{id}/reverter-pendente")
    public void reverterPendente(Long id,
                                 @QueryValue Long agenteId,
                                 @QueryValue(defaultValue = "") String observacoesAgente) {
        service.reverterParaPendente(id, agenteId, observacoesAgente);
    }

    @Put("/{id}/reverter-analise")
    public void reverterAnalise(Long id,
                                @QueryValue Long agenteId,
                                @QueryValue(defaultValue = "") String observacoesAgente) {
        service.reverterParaEmAnalise(id, agenteId, observacoesAgente);
    }

    @Put("/{id}/reverter-aprovado")
    public void reverterAprovado(Long id,
                                 @QueryValue Long agenteId,
                                 @QueryValue(defaultValue = "") String observacoesAgente) {
        service.reverterParaAprovado(id, agenteId, observacoesAgente);
    }
}
