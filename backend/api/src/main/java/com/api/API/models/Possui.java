package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "possui")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Possui {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPossui;
    private Integer idCategoria;
    private Integer idRestaurante;
}
