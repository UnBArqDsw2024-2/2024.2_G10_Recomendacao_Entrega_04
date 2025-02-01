package com.api.API.services;

import com.api.API.models.Avaliacao;
import com.api.API.repositories.AvaliacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;

    public AvaliacaoService(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    public List<Avaliacao> getAllAvaliacoes() {
        return avaliacaoRepository.findAll();
    }

    public List<Avaliacao> getAvaliacoesByRestaurante(Integer idRestarante) {
        return avaliacaoRepository.findByIdRestarante(idRestarante);
    }

    public Avaliacao createAvaliacao(Avaliacao avaliacao) {
        Avaliacao newAvaliacao = new Avaliacao(avaliacao.getTexto(), avaliacao.getUrlVideo(),
                avaliacao.getUrlImagen(), avaliacao.getNota(), avaliacao.getIdRestarante(), avaliacao.getIdCliente());
        return avaliacaoRepository.save(avaliacao);
    }

    public List<Avaliacao> getAvaliacoesByCliente(Integer idCliente) {
        return avaliacaoRepository.findByIdCliente(idCliente);
    }
}