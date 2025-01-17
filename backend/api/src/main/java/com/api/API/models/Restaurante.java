package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "restaurante")
public class Restaurante implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRestaurante;
    private String nomeRestaurante;
    private String endereco;
    private Integer idCliente;
    private Integer idFuncionario;


    public Restaurante(String nomeRestaurante, String endereco, Integer idCliente, Integer idFuncionario) {
        this.nomeRestaurante = nomeRestaurante;
        this.endereco = endereco;
        this.idCliente = idCliente;
        this.idFuncionario = idFuncionario;
    }
}

