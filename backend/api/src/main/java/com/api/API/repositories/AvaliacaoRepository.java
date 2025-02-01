package com.api.API.repositories;

import com.api.API.models.Avaliacao;
import com.api.API.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Integer> {

    List<Avaliacao> findByIdRestarante(Integer idRestarante);

    List<Avaliacao> findByIdCliente(Integer idCliente);
}
