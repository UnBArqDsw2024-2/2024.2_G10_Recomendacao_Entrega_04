import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, Box, TextField, Button, Rating, Modal } from '@mui/material';
import { restauranteService } from '../../services/restauranteService';
import Navbar from '../../components/navbar/navbar';

interface Avaliacao {
  idAvaliacao: number;
  texto: string;
  urlVideo: string;
  urlImagen: string;
  nota: number;
  idRestaurante: number;
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
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuario || !usuario.idCliente) {
      setOpenModal(true);
      return;
    }

    const idCliente = usuario.idCliente;

    const nova = {
      texto: novaAvaliacao,
      urlVideo: '',
      urlImagen: '',
      nota,
      idRestarante: Number(idRestaurante),
      idCliente: idCliente,
    };


    try {
      const response = await fetch(`http://localhost:8080/avaliacao/createAvaliacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova),
      });

      if (!response.ok) throw new Error('Erro ao enviar avaliação');

      setAvaliacoes((prev) => [...prev, { idAvaliacao: Date.now(), ...nova, idRestaurante: Number(idRestaurante) }]);
      setNovaAvaliacao('');
      setNota(null);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  

  return (
    <>
      <Navbar />

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            padding: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            fontFamily: "League Spartan",
            border: '2px solid #44a49b',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontFamily: "League Spartan", fontSize: 19 }}>
            Você precisa estar logado como Cliente para enviar uma avaliação.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#44a49b', marginBottom: 2 }}
            onClick={() => navigate('/cadastro')}
          >
            Cadastro
          </Button>
          <Typography variant="body2" mt={2} sx={{ fontFamily: "League Spartan", fontSize: 19 }}>
            Já possui uma conta?
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#44a49b', marginTop: 1 }}
            onClick={() => navigate('/signin')}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
            sx={{ marginTop: 2 }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>

      <Container sx={{ paddingY: 4 }}>
        {/* Restaurante Info */}
        {restaurante && (
          <>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2, fontFamily: 'League Spartan', textTransform: 'uppercase', color: '#9c1d0e', fontWeight: 'bold' }}>
              {restaurante.nomeRestaurante}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.secondary', marginBottom: 3, fontFamily: 'League Spartan' }}>
              Endereço: {restaurante.endereco}
            </Typography>
          </>
        )}

        {/* Média das Avaliações */}
        {mediaNota !== null && (
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 3, fontFamily: 'League Spartan' }}>
            Média das Avaliações: {mediaNota.toFixed(2)} ⭐
          </Typography>
        )}

        {/* Avaliações */}
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {avaliacoes.map((avaliacao) => (
            <Grid item xs={12} sm={6} md={4} key={avaliacao.idAvaliacao}>
              <Card sx={{ fontFamily: 'League Spartan',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                      borderRadius: 5, }}>
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {avaliacao.texto}
                  </Typography>
                  {avaliacao.urlImagen && <Box component="img" src={avaliacao.urlImagen} alt="Imagem" width="100%" sx={{ borderRadius: 1 }} />}
                  {avaliacao.urlVideo && (
                    <Box mt={2}>
                      <video width="100%" controls style={{ borderRadius: 1 }}>
                        <source src={avaliacao.urlVideo} type="video/mp4" />
                      </video>
                    </Box>
                  )}
                  <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    Nota: {avaliacao.nota.toFixed(2)} ⭐
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Campo para adicionar nova avaliação */}
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'League Spartan' }}>
            Deixe sua avaliação
          </Typography>
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
          <Button
            variant="contained"
            onClick={handleEnviarAvaliacao}
            sx={{
              padding: '10px 20px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#1976d2' },
              backgroundColor: '#44a49b',
            }}
          >
            ENVIAR AVALIAÇÃO
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AvaliacaoPage;