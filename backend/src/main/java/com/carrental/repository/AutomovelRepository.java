package com.carrental.repository;

import com.carrental.model.Automovel;
import com.carrental.enums.StatusAutomovel;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface AutomovelRepository extends CrudRepository<Automovel, Long> {

    List<Automovel> findByStatus(StatusAutomovel status);

    List<Automovel> findAll(); // já herdado do CrudRepository, mas explícito pra clareza
}