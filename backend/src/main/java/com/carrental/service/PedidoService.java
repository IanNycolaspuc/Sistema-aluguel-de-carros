package com.carrental.service;

import com.carrental.dto.PedidoCreateDTO;
import com.carrental.model.PedidoAluguel;
import com.carrental.enums.StatusPedido;
import com.carrental.repository.PedidoRepository;
import com.carrental.repository.AutomovelRepository;
import com.carrental.model.Automovel;
import java.time.LocalDate;
import jakarta.inject.Singleton;

import java.util.Optional;
import java.util.List;
import java.math.BigDecimal;

@Singleton
public class PedidoService {

    private final PedidoRepository repository;
    private final AutomovelRepository automovelRepository;

    // ✅ Injeção correta via construtor
    public PedidoService(PedidoRepository repository, AutomovelRepository automovelRepository) {
        this.repository = repository;
        this.automovelRepository = automovelRepository;
    }

   public PedidoAluguel criar(PedidoCreateDTO dto) {

    // 🔥 validações obrigatórias
    if (dto.getClienteId() == null || dto.getAutomovelId() == null) {
        throw new RuntimeException("Cliente e automóvel são obrigatórios");
    }

    if (dto.getQuantidadeDias() == null || dto.getQuantidadeDias() <= 0) {
        throw new RuntimeException("Quantidade de dias inválida");
    }

    PedidoAluguel pedido = new PedidoAluguel();

    pedido.setClienteId(dto.getClienteId());
    pedido.setAutomovelId(dto.getAutomovelId());
    pedido.setQuantidadeDias(dto.getQuantidadeDias());
    pedido.setObservacoes(dto.getObservacoes());

    // 🔥 CORRETO: backend controla data (evita erro do frontend)
    pedido.setDataFimPretendida(
        LocalDate.now().plusDays(dto.getQuantidadeDias())
    );

    // 🔥 buscar carro
    Automovel carro = automovelRepository
        .findById(dto.getAutomovelId())
        .orElseThrow(() -> new RuntimeException("Carro não encontrado"));

    // 🔥 cálculo do valor
    BigDecimal valor = carro.getValorDiaria()
        .multiply(BigDecimal.valueOf(dto.getQuantidadeDias()));

    pedido.setValorPrevisto(valor);

    pedido.setStatus(StatusPedido.PENDENTE);

    return repository.salvar(pedido);
}

    public List<PedidoAluguel> listarPorCliente(Long clienteId) {
        return repository.listarPorCliente(clienteId);
    }

    public List<PedidoAluguel> listarTodos() {
        return repository.listarTodos();
    }

    public void aprovar(Long id, Long agenteId) {
        PedidoAluguel pedido = repository.buscarPorId(id)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(StatusPedido.APROVADO);
        pedido.setAgenteId(agenteId);

        repository.atualizar(pedido);
    }

    public void rejeitar(Long id, Long agenteId) {
        PedidoAluguel pedido = repository.buscarPorId(id)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(StatusPedido.REJEITADO);
        pedido.setAgenteId(agenteId);

        repository.atualizar(pedido);
    }

    public void cancelar(Long id) {
        PedidoAluguel pedido = repository.buscarPorId(id)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(StatusPedido.CANCELADO);

        repository.atualizar(pedido);
    }

    public Optional<PedidoAluguel> buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }
}