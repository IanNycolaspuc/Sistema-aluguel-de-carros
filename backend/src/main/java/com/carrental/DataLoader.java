package com.carrental;

import com.carrental.enums.StatusAutomovel;
import com.carrental.enums.StatusPedido;
import com.carrental.enums.TipoUsuario;
import com.carrental.model.*;
import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import jakarta.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;

@Singleton
public class DataLoader implements ApplicationEventListener<ServerStartupEvent> {

    private final EntityManager em;

    public DataLoader(EntityManager em) {
        this.em = em;
    }

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        populate();
    }

    @Transactional
    public void populate() {
        Long count = em.createQuery("SELECT COUNT(u) FROM Usuario u", Long.class)
                       .getSingleResult();
        if (count > 0) {
            System.out.println("⚠️ DataLoader: banco já populado, pulando...");
            return;
        }

        Usuario admin = new Usuario();
        admin.setNome("Admin Sistema");
        admin.setEmail("admin@carrental.com");
        admin.setSenha("admin123");
        admin.setTipoUsuario(TipoUsuario.AGENTE);
        em.persist(admin);

        Usuario agente = new Usuario();
        agente.setNome("Agente João");
        agente.setEmail("joao@carrental.com");
        agente.setSenha("agente123");
        agente.setTipoUsuario(TipoUsuario.AGENTE);
        em.persist(agente);

        Endereco endereco1 = new Endereco(
            "Rua das Flores", "123", "Apto 10", "Centro", "Belo Horizonte", "MG", "30100-000"
        );
        Cliente maria = new Cliente();
        maria.setNome("Maria Silva");
        maria.setEmail("maria@carrental.com");
        maria.setSenha("senha123");
        maria.setTipoUsuario(TipoUsuario.CLIENTE);
        maria.setRg("12.345.678-9");
        maria.setCpf("123.456.789-00");
        maria.setTelefone("(31) 99999-1111");
        maria.setDataNascimento("1990-05-15");
        maria.setProfissao("Engenheira");
        maria.setEndereco(endereco1);
        em.persist(maria);

        Endereco endereco2 = new Endereco(
            "Av. Afonso Pena", "456", null, "Savassi", "Belo Horizonte", "MG", "30130-001"
        );
        Cliente carlos = new Cliente();
        carlos.setNome("Carlos Souza");
        carlos.setEmail("carlos@carrental.com");
        carlos.setSenha("senha123");
        carlos.setTipoUsuario(TipoUsuario.CLIENTE);
        carlos.setRg("98.765.432-1");
        carlos.setCpf("987.654.321-00");
        carlos.setTelefone("(31) 99999-2222");
        carlos.setDataNascimento("1985-08-22");
        carlos.setProfissao("Contador");
        carlos.setEndereco(endereco2);
        em.persist(carlos);

        Endereco endereco3 = new Endereco(
            "Rua da Bahia", "789", "Casa 2", "Lourdes", "Belo Horizonte", "MG", "30160-010"
        );
        Cliente ana = new Cliente();
        ana.setNome("Ana Pereira");
        ana.setEmail("ana@carrental.com");
        ana.setSenha("senha123");
        ana.setTipoUsuario(TipoUsuario.CLIENTE);
        ana.setRg("11.222.333-4");
        ana.setCpf("111.222.333-00");
        ana.setTelefone("(31) 99999-3333");
        ana.setDataNascimento("1995-12-01");
        ana.setProfissao("Professora");
        ana.setEndereco(endereco3);
        em.persist(ana);

        Automovel corolla = new Automovel();
        corolla.setMarca("Toyota"); corolla.setModelo("Corolla");
        corolla.setAno(2022); corolla.setPlaca("ABC-1234");
        corolla.setMatricula("MAT001"); corolla.setStatus(StatusAutomovel.DISPONIVEL);
        corolla.setValorDiaria(new BigDecimal("150.00"));
        corolla.setUrlImgAutomovel("");
        em.persist(corolla);

        Automovel civic = new Automovel();
        civic.setMarca("Honda"); civic.setModelo("Civic");
        civic.setAno(2021); civic.setPlaca("DEF-5678");
        civic.setMatricula("MAT002"); civic.setStatus(StatusAutomovel.DISPONIVEL);
        civic.setValorDiaria(new BigDecimal("180.00"));
        civic.setUrlImgAutomovel("");
        em.persist(civic);

        Automovel polo = new Automovel();
        polo.setMarca("Volkswagen"); polo.setModelo("Polo");
        polo.setAno(2023); polo.setPlaca("GHI-9012");
        polo.setMatricula("MAT003"); polo.setStatus(StatusAutomovel.ALUGADO);
        polo.setValorDiaria(new BigDecimal("140.00"));
        polo.setUrlImgAutomovel("");
        em.persist(polo);

        Automovel onix = new Automovel();
        onix.setMarca("Chevrolet"); onix.setModelo("Onix");
        onix.setAno(2022); onix.setPlaca("JKL-3456");
        onix.setMatricula("MAT004"); onix.setStatus(StatusAutomovel.DISPONIVEL);
        onix.setValorDiaria(new BigDecimal("120.00"));
        onix.setUrlImgAutomovel("");
        em.persist(onix);

        Automovel hb20 = new Automovel();
        hb20.setMarca("Hyundai"); hb20.setModelo("HB20");
        hb20.setAno(2021); hb20.setPlaca("MNO-7890");
        hb20.setMatricula("MAT005"); hb20.setStatus(StatusAutomovel.MANUTENCAO);
        hb20.setValorDiaria(new BigDecimal("110.00"));
        hb20.setUrlImgAutomovel("");
        em.persist(hb20);

        Automovel cronos = new Automovel();
        cronos.setMarca("Fiat"); cronos.setModelo("Cronos");
        cronos.setAno(2023); cronos.setPlaca("PQR-1122");
        cronos.setMatricula("MAT006"); cronos.setStatus(StatusAutomovel.DISPONIVEL);
        cronos.setValorDiaria(new BigDecimal("130.00"));
        cronos.setUrlImgAutomovel("");
        em.persist(cronos);

        Automovel tracker = new Automovel();
        tracker.setMarca("Chevrolet"); tracker.setModelo("Tracker");
        tracker.setAno(2023); tracker.setPlaca("STU-7788");
        tracker.setMatricula("MAT007"); tracker.setStatus(StatusAutomovel.DISPONIVEL);
        tracker.setValorDiaria(new BigDecimal("200.00"));
        tracker.setUrlImgAutomovel("");
        em.persist(tracker);

        Automovel compass = new Automovel();
        compass.setMarca("Jeep"); compass.setModelo("Compass");
        compass.setAno(2022); compass.setPlaca("VWX-3344");
        compass.setMatricula("MAT008"); compass.setStatus(StatusAutomovel.DISPONIVEL);
        compass.setValorDiaria(new BigDecimal("220.00"));
        compass.setUrlImgAutomovel("");
        em.persist(compass);

        Automovel kwid = new Automovel();
        kwid.setMarca("Renault"); kwid.setModelo("Kwid");
        kwid.setAno(2021); kwid.setPlaca("YZA-5566");
        kwid.setMatricula("MAT009"); kwid.setStatus(StatusAutomovel.DISPONIVEL);
        kwid.setValorDiaria(new BigDecimal("80.00"));
        kwid.setUrlImgAutomovel("");
        em.persist(kwid);

        Automovel argo = new Automovel();
        argo.setMarca("Fiat"); argo.setModelo("Argo");
        argo.setAno(2022); argo.setPlaca("AAA-1111");
        argo.setMatricula("MAT010"); argo.setStatus(StatusAutomovel.DISPONIVEL);
        argo.setValorDiaria(new BigDecimal("115.00"));
        argo.setUrlImgAutomovel("");
        em.persist(argo);

        Automovel creta = new Automovel();
        creta.setMarca("Hyundai"); creta.setModelo("Creta");
        creta.setAno(2023); creta.setPlaca("BBB-2222");
        creta.setMatricula("MAT011"); creta.setStatus(StatusAutomovel.DISPONIVEL);
        creta.setValorDiaria(new BigDecimal("190.00"));
        creta.setUrlImgAutomovel("");
        em.persist(creta);

        Automovel renegade = new Automovel();
        renegade.setMarca("Jeep"); renegade.setModelo("Renegade");
        renegade.setAno(2022); renegade.setPlaca("CCC-3333");
        renegade.setMatricula("MAT012"); renegade.setStatus(StatusAutomovel.ALUGADO);
        renegade.setValorDiaria(new BigDecimal("210.00"));
        renegade.setUrlImgAutomovel("teste");
        em.persist(renegade);

        Automovel gol = new Automovel();
        gol.setMarca("Volkswagen"); gol.setModelo("Gol");
        gol.setAno(2021); gol.setPlaca("DDD-4444");
        gol.setMatricula("MAT013"); gol.setStatus(StatusAutomovel.DISPONIVEL);
        gol.setValorDiaria(new BigDecimal("90.00"));
        gol.setUrlImgAutomovel("");
        em.persist(gol);

        Automovel fiesta = new Automovel();
        fiesta.setMarca("Ford"); fiesta.setModelo("Fiesta");
        fiesta.setAno(2020); fiesta.setPlaca("EEE-5555");
        fiesta.setMatricula("MAT014"); fiesta.setStatus(StatusAutomovel.MANUTENCAO);
        fiesta.setValorDiaria(new BigDecimal("85.00"));
        fiesta.setUrlImgAutomovel("");
        em.persist(fiesta);

        em.flush();

        PedidoAluguel pedido1 = new PedidoAluguel();
        pedido1.setClienteId(maria.getId());
        pedido1.setAutomovelId(polo.getId());
        pedido1.setDataFimPretendida(LocalDate.of(2026, 4, 20));
        pedido1.setValorPrevisto(new BigDecimal("450.00"));
        pedido1.setObservacoes("Cliente solicitou seguro completo");
        pedido1.setStatus(StatusPedido.APROVADO);
        pedido1.setAgenteId(agente.getId());
        em.persist(pedido1);

        PedidoAluguel pedido2 = new PedidoAluguel();
        pedido2.setClienteId(carlos.getId());
        pedido2.setAutomovelId(corolla.getId());
        pedido2.setDataFimPretendida(LocalDate.of(2026, 4, 18));
        pedido2.setValorPrevisto(new BigDecimal("320.00"));
        pedido2.setStatus(StatusPedido.PENDENTE);
        pedido2.setAgenteId(agente.getId());
        em.persist(pedido2);

        PedidoAluguel pedido3 = new PedidoAluguel();
        pedido3.setClienteId(ana.getId());
        pedido3.setAutomovelId(civic.getId());
        pedido3.setDataFimPretendida(LocalDate.of(2026, 4, 25));
        pedido3.setValorPrevisto(new BigDecimal("600.00"));
        pedido3.setObservacoes("Viagem a trabalho");
        pedido3.setStatus(StatusPedido.PENDENTE);
        em.persist(pedido3);

        System.out.println("✅ DataLoader: banco populado com sucesso!");
    }
}