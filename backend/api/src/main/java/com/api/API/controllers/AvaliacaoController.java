package com.api.API.controllers;

import com.api.API.models.Avaliacao;
import com.api.API.services.AvaliacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    public AvaliacaoController(AvaliacaoService avaliacaoService) {
        this.avaliacaoService = avaliacaoService;
    }

    @GetMapping("/getAllAvaliacoes")
    public ResponseEntity<List<Avaliacao>> getAllAvaliacoes() {
        return ResponseEntity.ok(avaliacaoService.getAllAvaliacoes());
    }

    @PostMapping("/createAvaliacao")
    public ResponseEntity<Avaliacao> createAvaliacao(@RequestBody Avaliacao avaliacao) {
        Avaliacao newAvaliacao = avaliacaoService.createAvaliacao(avaliacao);
        return ResponseEntity.ok(newAvaliacao);
    }

    @GetMapping("/restaurante")
    public ResponseEntity<List<Avaliacao>> getAvaliacoesByRestaurante(@RequestParam Integer idRestaurante) {
        List<Avaliacao> avaliacoes = avaliacaoService.getAvaliacoesByRestaurante(idRestaurante);
        if (avaliacoes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(avaliacoes);
    }
}
