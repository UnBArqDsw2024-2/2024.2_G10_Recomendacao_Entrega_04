package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCliente;
    private String nome;
    private String email;
    private String senha;
    private String unFederacao;
    private String cidade;

    public Cliente(String nome, String email, String senha, String unFederacao, String cidade) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.unFederacao = unFederacao;
        this.cidade = cidade;
    }
}
