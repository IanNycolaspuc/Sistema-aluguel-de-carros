package com.carrental.service;

import com.carrental.dto.ClienteDTO;
import com.carrental.exception.ClienteDuplicadoException;
import com.carrental.exception.ClienteNaoEncontradoException;
import com.carrental.model.Cliente;
import com.carrental.repository.ClienteRepository;
import com.carrental.enums.TipoUsuario;
import jakarta.inject.Singleton;

import java.util.List;

/**
 * Implementação da camada de serviço para Cliente.
 *
 * Contém as regras de negócio do sistema:
 *  - Unicidade de CPF e RG
 *  - Conversão DTO → Entidade
 *  - Limite de 3 entidades empregadoras (delegado à entidade)
 */
@Singleton
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public Cliente cadastrar(ClienteDTO dto) {
        // RN01 - CPF único no sistema
        if (clienteRepository.existePorCpf(dto.getCpf())) {
            throw new ClienteDuplicadoException(
                ClienteDuplicadoException.TipoDuplicidade.CPF, dto.getCpf()
            );
        }

        // RN02 - RG único no sistema
        if (clienteRepository.existePorRg(dto.getRg())) {
            throw new ClienteDuplicadoException(
                ClienteDuplicadoException.TipoDuplicidade.RG, dto.getRg()
            );
        }

        Cliente cliente = toEntity(dto);
        return clienteRepository.salvar(cliente);
    }

    @Override
    public Cliente atualizar(Long id, ClienteDTO dto) {
        // Verifica se o cliente existe
        Cliente clienteExistente = clienteRepository.buscarPorId(id)
                .orElseThrow(() -> new ClienteNaoEncontradoException(id));

        // RN01 - Verifica CPF duplicado (ignorando o próprio cliente)
        clienteRepository.buscarPorCpf(dto.getCpf())
                .filter(c -> !c.getId().equals(id))
                .ifPresent(c -> {
                    throw new ClienteDuplicadoException(
                        ClienteDuplicadoException.TipoDuplicidade.CPF, dto.getCpf()
                    );
                });

        // RN02 - Verifica RG duplicado (ignorando o próprio cliente)
        clienteRepository.buscarPorRg(dto.getRg())
                .filter(c -> !c.getId().equals(id))
                .ifPresent(c -> {
                    throw new ClienteDuplicadoException(
                        ClienteDuplicadoException.TipoDuplicidade.RG, dto.getRg()
                    );
                });

        // Atualiza os dados mantendo metadados originais
        Cliente clienteAtualizado = toEntity(dto);
        clienteAtualizado.setId(id);
        clienteAtualizado.setDataCadastro(clienteExistente.getDataCadastro());
        clienteAtualizado.setAtivo(clienteExistente.isAtivo());

        return clienteRepository.atualizar(clienteAtualizado);
    }

    @Override
    public Cliente buscarPorId(Long id) {
        return clienteRepository.buscarPorId(id)
                .orElseThrow(() -> new ClienteNaoEncontradoException(id));
    }

    @Override
    public List<Cliente> listarTodos() {
        return clienteRepository.listarTodos();
    }

    @Override
    public List<Cliente> buscarPorNome(String nome) {
        if (nome == null || nome.isBlank()) {
            return listarTodos();
        }
        return clienteRepository.buscarPorNome(nome);
    }

    @Override
    public void deletar(Long id) {
        // Verifica se existe antes de tentar deletar
        clienteRepository.buscarPorId(id)
                .orElseThrow(() -> new ClienteNaoEncontradoException(id));

        clienteRepository.deletar(id);
    }

    // ── Mapeamento DTO → Entidade ───────────────────────────────────────────

   private Cliente toEntity(ClienteDTO dto) {
    Cliente cliente = new Cliente();

    cliente.setRg(dto.getRg());
    cliente.setCpf(dto.getCpf());
    cliente.setNome(dto.getNome());
    cliente.setEmail(dto.getEmail());
    cliente.setSenha(dto.getSenha()); 
    cliente.setTipoUsuario(TipoUsuario.CLIENTE); 

    cliente.setTelefone(dto.getTelefone());
    cliente.setDataNascimento(dto.getDataNascimento());
    cliente.setEndereco(dto.getEndereco());
    cliente.setProfissao(dto.getProfissao());
    cliente.setEntidadesEmpregadoras(dto.getEntidadesEmpregadoras());

    return cliente;
}
}
