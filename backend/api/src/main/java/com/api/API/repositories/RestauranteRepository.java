package com.api.API.repositories;

import com.api.API.models.Funcionario;
import com.api.API.models.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import java.util.Optional;

public interface RestauranteRepository extends JpaRepository<Restaurante, Integer> {

    Optional<Restaurante> findFirstByNomeRestaurante(String nomeRestaurante);

    List<Restaurante> findByIdFuncionario(Integer idFuncionario);
}
