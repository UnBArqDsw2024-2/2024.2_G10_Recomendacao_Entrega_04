package com.api.API.repositories;

import com.api.API.models.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findFirstByEmail(String email);

}
