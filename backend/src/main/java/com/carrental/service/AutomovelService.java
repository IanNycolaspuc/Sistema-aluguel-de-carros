package com.carrental.service;

import com.carrental.enums.StatusAutomovel;
import com.carrental.model.Automovel;
import com.carrental.repository.AutomovelRepository;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.Optional;

@Singleton
public class AutomovelService {

    private final AutomovelRepository repository;
    private static long contador = 1; // para gerar automaticamente uma matricula

    public AutomovelService(AutomovelRepository repository) {
        this.repository = repository;
    }

    public Automovel salvar(Automovel automovel) {
    // logica para gerar uma matricula automatica //
    String matricula = "CAR-" + String.format("%03d", contador++);
    automovel.setMatricula(matricula);

    return repository.save(automovel);
}

    public List<Automovel> listar() {
        return (List<Automovel>) repository.findAll();
    }

    public Optional<Automovel> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Automovel atualizar(Long id, Automovel novo) {
        novo.setId(id);
        return repository.update(novo);
    }

    public List<Automovel> disponiveis() {
return repository.findByStatus(StatusAutomovel.DISPONIVEL);    }
}