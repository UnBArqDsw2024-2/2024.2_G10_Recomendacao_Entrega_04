package com.api.API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "avaliacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAvaliacao;
    private String texto;
    private String urlVideo;
    private String urlImagen;
    private BigDecimal nota;
    private Integer idRestarante;
    private Integer idCliente;

    public Avaliacao(String texto, String urlVideo, String urlImagen, BigDecimal nota, Integer idRestarante, Integer idCliente) {
        this.texto = texto;
        this.urlVideo = urlVideo;
        this.urlImagen = urlImagen;
        this.nota = nota;
        this.idRestarante = idRestarante;
        this.idCliente = idCliente;
    }
}
