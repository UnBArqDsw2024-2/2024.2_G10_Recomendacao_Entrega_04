package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "prato")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Prato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPrato;
    private String nomePrato;
    private String descricao;
    private BigDecimal preco;


}
