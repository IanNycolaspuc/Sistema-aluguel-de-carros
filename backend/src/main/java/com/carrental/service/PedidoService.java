package com.carrental.service;

import com.carrental.dto.PedidoCreateDTO;
import com.carrental.model.PedidoAluguel;
import com.carrental.enums.StatusPedido;
import com.carrental.repository.PedidoRepository;
import jakarta.inject.Singleton;
import java.util.Optional;

import java.util.List;

@Singleton
public class PedidoService {

    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    public PedidoAluguel criar(PedidoCreateDTO dto) {

        PedidoAluguel pedido = new PedidoAluguel();
        pedido.setClienteId(dto.getClienteId());
        pedido.setAutomovelId(dto.getAutomovelId());
        pedido.setDataFimPretendida(dto.getDataFimPretendida());
        pedido.setObservacoes(dto.getObservacoes());

        return repository.salvar(pedido);
    }

    public List<PedidoAluguel> listarPorCliente(Long clienteId) {
        return repository.listarPorCliente(clienteId);
    }

    public List<PedidoAluguel> listarTodos() {
        return repository.listarTodos();
    }

    public void aprovar(Long id, Long agenteId) {
        PedidoAluguel pedido = repository.buscarPorId(id).orElseThrow();

        pedido.setStatus(StatusPedido.APROVADO);
        pedido.setAgenteId(agenteId);

        repository.atualizar(pedido);
    }

    public void rejeitar(Long id, Long agenteId) {
        PedidoAluguel pedido = repository.buscarPorId(id).orElseThrow();

        pedido.setStatus(StatusPedido.REJEITADO);
        pedido.setAgenteId(agenteId);

        repository.atualizar(pedido);
    }

    public void cancelar(Long id) {
        PedidoAluguel pedido = repository.buscarPorId(id).orElseThrow();

        pedido.setStatus(StatusPedido.CANCELADO);

        repository.atualizar(pedido);
    }

    public Optional<PedidoAluguel> buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
}