package com.api.API.controllers;

import com.api.API.models.Restaurante;
import com.api.API.services.RestauranteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurante")
public class RestauranteController {

    private final RestauranteService restauranteService;

    public RestauranteController(RestauranteService restauranteService) {
        this.restauranteService = restauranteService;
    }

    @GetMapping("/getAllRestaurantes")
    public ResponseEntity<List<Restaurante>> getAllRestaurantes() {
        return ResponseEntity.ok(restauranteService.getAllRestaurantes());
    }

    @PostMapping("/createRestaurante")
    public ResponseEntity<Restaurante> createRestaurante(@RequestBody Restaurante restaurante) {
        Restaurante newRestaurante = restauranteService.createRestaurante(restaurante);
        return ResponseEntity.ok(newRestaurante);
    }

    @GetMapping("/nome")
    public ResponseEntity<Restaurante> getRestauranteByNome(@RequestParam String nomeRestaurante) {
        return restauranteService.getRestauranteByNome(nomeRestaurante)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}