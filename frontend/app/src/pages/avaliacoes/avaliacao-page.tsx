import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Box, TextField, Button, Rating } from '@mui/material';
import { restauranteService } from '../../services/restauranteService';
import Navbar from '../../components/navbar/navbar';

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

  const [novaAvaliacao, setNovaAvaliacao] = useState<string>('');
  const [nota, setNota] = useState<number | null>(null);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const restaurantes = await restauranteService.listar();
        const restauranteEncontrado = restaurantes.find(r => r.idRestaurante === Number(idRestaurante));
        setRestaurante(restauranteEncontrado ?? null);

        const response = await fetch(`http://localhost:8080/avaliacao/restaurante?idRestaurante=${idRestaurante}`);
        if (!response.ok) throw new Error('Erro ao buscar avaliações');
        const dados = await response.json();
        setAvaliacoes(dados);

        if (dados.length > 0) {
          const somaNotas = dados.reduce((acc: number, avaliacao: Avaliacao) => acc + avaliacao.nota, 0);
          setMediaNota(somaNotas / dados.length);
        } else {
          setMediaNota(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvaliacoes();
  }, [idRestaurante]);

  const handleEnviarAvaliacao = async () => {
    if (!novaAvaliacao.trim() || nota === null) {
      alert('Preencha todos os campos antes de enviar.');
      return;
    }

    try {

      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}'); 
      const idCliente = usuario.idCliente;

      const nova = {
        texto: novaAvaliacao,
        urlVideo: '',
        urlImagen: '',
        nota,
        idRestarante: Number(idRestaurante),
        idCliente: idCliente,
      };

      const response = await fetch(`http://localhost:8080/avaliacao/createAvaliacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova),
      });

      if (!response.ok) throw new Error('Erro ao enviar avaliação');

      setAvaliacoes((prev) => [...prev, { idAvaliacao: Date.now(), ...nova }]);
      setNovaAvaliacao('');
      setNota(null);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  return (
    <>
      <Navbar />
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

      {/* Campo para adicionar nova avaliação */}
      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Typography variant="h6">Deixe sua Avaliação</Typography>
        <Rating
          name="nota"
          value={nota}
          onChange={(_, newValue) => setNota(newValue)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          variant="outlined"
          label="Escreva sua avaliação"
          value={novaAvaliacao}
          onChange={(e) => setNovaAvaliacao(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleEnviarAvaliacao}>
          Enviar Avaliação
        </Button>
      </Box>
      </Container>
    </>
  );
};

export default AvaliacaoPage;
