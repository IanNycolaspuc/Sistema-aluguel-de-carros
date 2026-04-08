package com.carrental.controller;

import com.carrental.dto.ClienteDTO;
import com.carrental.model.Cliente;
import com.carrental.model.Endereco;
import com.carrental.model.EntidadeEmpregadora;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ClienteControllerTest {

    @Inject
    @Client("/")
    HttpClient client;

    // ── Helpers ──────────────────────────────────────────────────────────────

    private ClienteDTO criarDtoValido(String cpf, String rg) {
        ClienteDTO dto = new ClienteDTO();
        dto.setNome("João Silva");
        dto.setCpf(cpf);
        dto.setRg(rg);
        dto.setEmail("joao.silva@email.com");
        dto.setTelefone("(31) 99999-0001");
        dto.setDataNascimento("1990-05-15");
        dto.setProfissao("Engenheiro");

        Endereco end = new Endereco();
        end.setLogradouro("Rua das Flores");
        end.setNumero("100");
        end.setBairro("Centro");
        end.setCidade("Belo Horizonte");
        end.setEstado("MG");
        end.setCep("30130-110");
        dto.setEndereco(end);

        EntidadeEmpregadora emp = new EntidadeEmpregadora();
        emp.setNome("Tech Corp Ltda");
        emp.setCnpj("12.345.678/0001-90");
        emp.setCargo("Desenvolvedor Sênior");
        emp.setRendimento(new BigDecimal("8500.00"));
        dto.setEntidadesEmpregadoras(List.of(emp));

        return dto;
    }

    // ── Testes de Cadastro (POST) ─────────────────────────────────────────────

    @Test
    @DisplayName("POST /api/clientes - deve cadastrar cliente com sucesso")
    void deveCadastrarClienteComSucesso() {
        ClienteDTO dto = criarDtoValido("123.456.789-01", "12.345.678-1");

        HttpResponse<Cliente> response = client.toBlocking().exchange(
                HttpRequest.POST("/api/clientes", dto),
                Cliente.class
        );

        assertEquals(HttpStatus.CREATED, response.getStatus());
        assertNotNull(response.body());
        assertNotNull(response.body().getId());
        assertEquals("João Silva", response.body().getNome());
        assertEquals("123.456.789-01", response.body().getCpf());
    }

    @Test
    @DisplayName("POST /api/clientes - deve retornar 409 para CPF duplicado")
    void deveRetornar409ParaCpfDuplicado() {
        ClienteDTO dto = criarDtoValido("999.888.777-66", "99.888.777-6");

        // Primeiro cadastro
        client.toBlocking().exchange(HttpRequest.POST("/api/clientes", dto), Cliente.class);

        // Segundo cadastro com mesmo CPF
        ClienteDTO dto2 = criarDtoValido("999.888.777-66", "11.222.333-4");

        HttpClientResponseException ex = assertThrows(HttpClientResponseException.class, () -> {
            client.toBlocking().exchange(
                    HttpRequest.POST("/api/clientes", dto2),
                    String.class
            );
        });

        assertEquals(HttpStatus.CONFLICT, ex.getStatus());
    }

    // ── Testes de Listagem (GET) ──────────────────────────────────────────────

    @Test
    @DisplayName("GET /api/clientes - deve listar clientes")
    void deveListarClientes() {
        HttpResponse<List> response = client.toBlocking().exchange(
                HttpRequest.GET("/api/clientes"),
                List.class
        );

        assertEquals(HttpStatus.OK, response.getStatus());
        assertNotNull(response.body());
    }

    // ── Testes de Busca por ID (GET /{id}) ───────────────────────────────────

    @Test
    @DisplayName("GET /api/clientes/{id} - deve buscar cliente por ID")
    void deveBuscarClientePorId() {
        ClienteDTO dto = criarDtoValido("111.222.333-44", "11.222.333-4");

        HttpResponse<Cliente> created = client.toBlocking().exchange(
                HttpRequest.POST("/api/clientes", dto),
                Cliente.class
        );

        Long id = created.body().getId();

        HttpResponse<Cliente> response = client.toBlocking().exchange(
                HttpRequest.GET("/api/clientes/" + id),
                Cliente.class
        );

        assertEquals(HttpStatus.OK, response.getStatus());
        assertEquals(id, response.body().getId());
    }

    @Test
    @DisplayName("GET /api/clientes/{id} - deve retornar 404 para ID inexistente")
    void deveRetornar404ParaIdInexistente() {
        HttpClientResponseException ex = assertThrows(HttpClientResponseException.class, () -> {
            client.toBlocking().exchange(
                    HttpRequest.GET("/api/clientes/99999"),
                    String.class
            );
        });

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }

    // ── Testes de Atualização (PUT) ───────────────────────────────────────────

    @Test
    @DisplayName("PUT /api/clientes/{id} - deve atualizar cliente com sucesso")
    void deveAtualizarClienteComSucesso() {
        ClienteDTO dto = criarDtoValido("222.333.444-55", "22.333.444-5");

        HttpResponse<Cliente> created = client.toBlocking().exchange(
                HttpRequest.POST("/api/clientes", dto),
                Cliente.class
        );

        Long id = created.body().getId();

        dto.setNome("João Silva Atualizado");
        dto.setProfissao("Arquiteto de Software");

        HttpResponse<Cliente> response = client.toBlocking().exchange(
                HttpRequest.PUT("/api/clientes/" + id, dto),
                Cliente.class
        );

        assertEquals(HttpStatus.OK, response.getStatus());
        assertEquals("João Silva Atualizado", response.body().getNome());
        assertEquals("Arquiteto de Software", response.body().getProfissao());
    }

    // ── Testes de Remoção (DELETE) ────────────────────────────────────────────

    @Test
    @DisplayName("DELETE /api/clientes/{id} - deve remover cliente logicamente")
    void deveRemoverClienteLogicamente() {
        ClienteDTO dto = criarDtoValido("333.444.555-66", "33.444.555-6");

        HttpResponse<Cliente> created = client.toBlocking().exchange(
                HttpRequest.POST("/api/clientes", dto),
                Cliente.class
        );

        Long id = created.body().getId();

        HttpResponse<Void> deleteResponse = client.toBlocking().exchange(
                HttpRequest.DELETE("/api/clientes/" + id),
                Void.class
        );

        assertEquals(HttpStatus.NO_CONTENT, deleteResponse.getStatus());

        // Confirma que não existe mais
        HttpClientResponseException ex = assertThrows(HttpClientResponseException.class, () -> {
            client.toBlocking().exchange(
                    HttpRequest.GET("/api/clientes/" + id),
                    String.class
            );
        });

        assertEquals(HttpStatus.NOT_FOUND, ex.getStatus());
    }
}