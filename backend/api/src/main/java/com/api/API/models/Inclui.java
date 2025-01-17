package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "inclui")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Inclui {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer idMenu;
    private Integer idPrato;
}
