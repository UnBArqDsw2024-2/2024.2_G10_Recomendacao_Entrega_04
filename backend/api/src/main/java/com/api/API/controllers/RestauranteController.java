package com.api.API.controllers;

import com.api.API.models.Restaurante;
import com.api.API.services.RestauranteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurante")
public class RestauranteController {

    private final RestauranteService restauranteService;

    public RestauranteController(RestauranteService restauranteService) {
        this.restauranteService = restauranteService;
    }

    @GetMapping("/getAllRestaurantes")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Restaurante>> getAllRestaurantes() {
        return ResponseEntity.ok(restauranteService.getAllRestaurantes());
    }

    @PostMapping("/createRestaurante")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Restaurante> createRestaurante(@RequestBody Restaurante restaurante) {
        Restaurante newRestaurante = restauranteService.createRestaurante(restaurante);
        return ResponseEntity.ok(newRestaurante);
    }

    @GetMapping("/nome")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Restaurante> getRestauranteByNome(@RequestParam String nomeRestaurante) {
        return restauranteService.getRestauranteByNome(nomeRestaurante)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/id")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Restaurante> getRestauranteById(@RequestParam Integer idRestaurante) {
        Optional<Restaurante> restaurante = restauranteService.getRestauranteById(idRestaurante);
        return restaurante.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
