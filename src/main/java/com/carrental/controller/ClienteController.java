package com.carrental.controller;

import com.carrental.dto.ClienteDTO;
import com.carrental.exception.ClienteDuplicadoException;
import com.carrental.exception.ClienteNaoEncontradoException;
import com.carrental.model.Cliente;
import com.carrental.service.ClienteService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.http.annotation.Error;
import io.micronaut.http.uri.UriBuilder;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Map;

/**
 * Controller REST para o CRUD de Cliente.
 *
 * Padrão MVC — Camada de Controle:
 *  - Recebe requisições HTTP
 *  - Delega lógica ao {@link ClienteService} (Modelo)
 *  - Retorna respostas estruturadas (JSON) para a camada de Visão (frontend)
 *
 * Base URL: /api/clientes
 */
@Controller("/api/clientes")
@Produces(MediaType.APPLICATION_JSON)
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * POST /api/clientes
     * Cadastra um novo cliente.
     *
     * @param dto Dados do cliente (body JSON)
     * @return 201 Created com o cliente cadastrado e Location header
     */
    @Post
    @Consumes(MediaType.APPLICATION_JSON)
    public HttpResponse<Cliente> cadastrar(@Body @Valid ClienteDTO dto) {
        Cliente clienteSalvo = clienteService.cadastrar(dto);

        URI location = UriBuilder.of("/api/clientes/{id}")
                .expand(Map.of("id", clienteSalvo.getId()));

        return HttpResponse.created(clienteSalvo).header("Location", location.toString());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // READ — Listar todos
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * GET /api/clientes
     * Lista todos os clientes ativos.
     * Suporta busca por nome via query parameter: ?nome=João
     *
     * @param nome (opcional) Filtro por nome
     * @return 200 OK com lista de clientes
     */
    @Get
    public HttpResponse<List<Cliente>> listar(@QueryValue(defaultValue = "") String nome) {
        List<Cliente> clientes = nome.isBlank()
                ? clienteService.listarTodos()
                : clienteService.buscarPorNome(nome);

        return HttpResponse.ok(clientes);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // READ — Buscar por ID
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * GET /api/clientes/{id}
     * Retorna um cliente específico pelo ID.
     *
     * @param id Identificador do cliente
     * @return 200 OK com o cliente, ou 404 Not Found
     */
    @Get("/{id}")
    public HttpResponse<Cliente> buscarPorId(@PathVariable Long id) {
        Cliente cliente = clienteService.buscarPorId(id);
        return HttpResponse.ok(cliente);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // UPDATE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * PUT /api/clientes/{id}
     * Atualiza todos os dados de um cliente existente.
     *
     * @param id  Identificador do cliente
     * @param dto Novos dados do cliente (body JSON)
     * @return 200 OK com o cliente atualizado, ou 404 Not Found
     */
    @Put("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public HttpResponse<Cliente> atualizar(@PathVariable Long id, @Body @Valid ClienteDTO dto) {
        Cliente clienteAtualizado = clienteService.atualizar(id, dto);
        return HttpResponse.ok(clienteAtualizado);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * DELETE /api/clientes/{id}
     * Remove logicamente um cliente (marca como inativo).
     *
     * @param id Identificador do cliente
     * @return 204 No Content, ou 404 Not Found
     */
    @Delete("/{id}")
    public HttpResponse<Void> deletar(@PathVariable Long id) {
        clienteService.deletar(id);
        return HttpResponse.noContent();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TRATAMENTO DE EXCEÇÕES
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Trata erros de cliente não encontrado → HTTP 404
     */
@io.micronaut.http.annotation.Error(exception = ClienteNaoEncontradoException.class)
    public HttpResponse<Map<String, String>> handleNaoEncontrado(ClienteNaoEncontradoException ex) {
        return HttpResponse.<Map<String, String>>status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "erro", "NOT_FOUND",
                        "mensagem", ex.getMessage()
                ));
    }

    /**
     * Trata erros de duplicidade de CPF/RG → HTTP 409 Conflict
     */
@io.micronaut.http.annotation.Error(exception = ClienteNaoEncontradoException.class)
    public HttpResponse<Map<String, String>> handleDuplicado(ClienteDuplicadoException ex) {
        return HttpResponse.<Map<String, String>>status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "erro", "CONFLICT",
                        "campo", ex.getTipo().name(),
                        "mensagem", ex.getMessage()
                ));
    }

    /**
     * Trata erros de regra de negócio (ex: limite de empregadoras) → HTTP 422
     */
@io.micronaut.http.annotation.Error(exception = ClienteNaoEncontradoException.class)    public HttpResponse<Map<String, String>> handleRegraDeNegocio(IllegalArgumentException ex) {
        return HttpResponse.<Map<String, String>>status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(Map.of(
                        "erro", "UNPROCESSABLE_ENTITY",
                        "mensagem", ex.getMessage()
                ));
    }
}
