package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "funcionario")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFuncionario;
    private String nome;
    private String email;
    private String senha;
    private String cargo;
    private String telefone;

    public Funcionario(String nome, String email, String senha, String cargo, String telefone) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cargo = cargo;
        this.telefone = telefone;
    }
}
