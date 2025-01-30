import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';
import { restauranteService } from '../../services/restauranteService';

interface Avaliacao {
  idAvaliacao: number;
  texto: string;
  urlVideo: string;
  urlImagen: string;
  nota: number;
  idRestarante: number;
  idCliente: number;
}

interface Restaurante {
  idRestaurante: number;
  nomeRestaurante: string;
  endereco: string;
}

const AvaliacaoPage = () => {
  const { idRestaurante } = useParams<{ idRestaurante: string }>();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [mediaNota, setMediaNota] = useState<number | null>(null);
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        // Buscar avaliações do restaurante
        const response = await fetch(`http://localhost:8080/avaliacao/restaurante?idRestaurante=${idRestaurante}`);
        if (!response.ok) throw new Error('Erro ao buscar avaliações');
        const dados = await response.json();
        setAvaliacoes(dados);

        // Calcular média das avaliações
        if (dados.length > 0) {
          const somaNotas = dados.reduce((acc: number, avaliacao: Avaliacao) => acc + avaliacao.nota, 0);
          setMediaNota(somaNotas / dados.length);
        } else {
          setMediaNota(null);
        }

        // Buscar dados do restaurante
        const restaurantes = await restauranteService.listar();
        const restauranteEncontrado = restaurantes.find(r => r.idRestaurante === Number(idRestaurante));
        setRestaurante(restauranteEncontrado ?? null); // 🔹 Corrigido para evitar erro

      } catch (error) {
        console.error(error);
      }
    };

    fetchAvaliacoes();
  }, [idRestaurante]);

  return (
    <Container>
      {restaurante && (
        <>
          <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 2 }}>
            {restaurante.nomeRestaurante}
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Endereço: {restaurante.endereco}
          </Typography>
        </>
      )}

      {mediaNota !== null && (
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
          Média das Avaliações: {mediaNota.toFixed(2)} ⭐
        </Typography>
      )}

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {avaliacoes.map((avaliacao) => (
          <Grid item xs={12} sm={6} md={4} key={avaliacao.idAvaliacao}>
            <Card>
              <CardContent>
                <Typography variant="body1">{avaliacao.texto}</Typography>
                {avaliacao.urlImagen && <Box component="img" src={avaliacao.urlImagen} alt="Imagem" width="100%" />}
                {avaliacao.urlVideo && (
                  <Box mt={2}>
                    <video width="100%" controls>
                      <source src={avaliacao.urlVideo} type="video/mp4" />
                    </video>
                  </Box>
                )}
                <Typography variant="h6" color="primary">Nota: {avaliacao.nota.toFixed(2)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvaliacaoPage;
