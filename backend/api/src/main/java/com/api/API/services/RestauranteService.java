package com.api.API.services;

import com.api.API.models.Restaurante;
import com.api.API.repositories.RestauranteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestauranteService {

    private final RestauranteRepository restauranteRepository;

    public RestauranteService(RestauranteRepository restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
    }

    public List<Restaurante> getAllRestaurantes() {
        return restauranteRepository.findAll();
    }

    public Restaurante createRestaurante(Restaurante restauranteSalvar) {
        Restaurante restaurante = new Restaurante(
                restauranteSalvar.getNomeRestaurante(),
                restauranteSalvar.getEndereco(),
                restauranteSalvar.getIdCliente(),
                restauranteSalvar.getIdFuncionario()
        );
        return restauranteRepository.save(restaurante);
    }

    public Optional<Restaurante> getRestauranteByNome(String nomeRestaurante) {
        return restauranteRepository.findFirstByNomeRestaurante(nomeRestaurante);
    }
}
