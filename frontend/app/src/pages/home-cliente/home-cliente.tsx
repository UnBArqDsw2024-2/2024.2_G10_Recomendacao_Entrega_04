import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Navbar from '../../components/navbar/navbar';

interface Avaliacao {
  idAvaliacao: number;
  texto: string;
  nota: number;
  idRestaurante: number;
}

interface Restaurante {
  idRestaurante: number;
  nomeRestaurante: string;
  endereco: string;
}

const HomeCliente: React.FC = () => {
  const navigate = useNavigate();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [restaurantes, setRestaurantes] = useState<Record<number, { nome: string; endereco: string }>>({});

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate('/login'); // Se não tiver usuário logado, redireciona para login
      return;
    }

    const { idCliente } = JSON.parse(usuario);

    const fetchAvaliacoes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/avaliacao/cliente?idCliente=${idCliente}`);
        if (!response.ok) throw new Error('Erro ao buscar avaliações');
        const data = await response.json();

        // Corrigindo erro de digitação na resposta da API
        const formattedData = data.map((avaliacao: any) => ({
          ...avaliacao,
          idRestaurante: avaliacao.idRestaurante || avaliacao.idRestarante, // Correção do nome do campo
        }));

        setAvaliacoes(formattedData);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchAvaliacoes();
  }, [navigate]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      const restaurantesTemp: Record<number, { nome: string; endereco: string }> = {};

      for (const avaliacao of avaliacoes) {
        if (!avaliacao.idRestaurante) {
          console.warn(`Avaliação ${avaliacao.idAvaliacao} não tem um idRestaurante válido`);
          continue;
        }

        if (!restaurantesTemp[avaliacao.idRestaurante]) {
          try {
            const restResponse = await fetch(
              `http://localhost:8080/restaurante/id?idRestaurante=${avaliacao.idRestaurante}`
            );
            if (!restResponse.ok) throw new Error('Erro ao buscar restaurante');
            const restData = await restResponse.json();

            // Salvando nome e endereço do restaurante
            restaurantesTemp[avaliacao.idRestaurante] = {
              nome: restData.nomeRestaurante,
              endereco: restData.endereco,
            };
          } catch (error) {
            console.error(`Erro ao buscar restaurante ${avaliacao.idRestaurante}:`, error);
          }
        }
      }

      setRestaurantes((prevRestaurantes) => ({ ...prevRestaurantes, ...restaurantesTemp }));
    };

    if (avaliacoes.length > 0) {
      fetchRestaurantes();
    }
  }, [avaliacoes]);

  return (
    <div className="home-cliente">
      <Navbar />

      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          Minhas Avaliações
        </Typography>

        {avaliacoes.length === 0 ? (
          <Typography variant="h6" align="center">
            Você ainda não fez nenhuma avaliação.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {avaliacoes.map((avaliacao) => {
              const restaurante = restaurantes[avaliacao.idRestaurante];
              const enderecoCurto =
                restaurante?.endereco?.length > 40 ? restaurante.endereco.slice(0, 40) + '...' : restaurante?.endereco;

              return (
                <Grid item xs={12} sm={6} md={4} key={avaliacao.idAvaliacao}>
                  <Card
                    sx={{
                      fontFamily: 'League Spartan',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                      borderRadius: 5,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <Box sx={{ padding: 2, backgroundColor: '#f8f8f8', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                      <Typography
                        color="#9c1d0e"
                        variant="h6"
                        sx={{ fontWeight: 'bold', fontFamily: 'League Spartan', textTransform: 'uppercase' }}
                      >
                        {restaurante?.nome || 'Carregando...'}
                      </Typography>
                      {restaurante?.endereco && (
                        <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'League Spartan' }}>
                          {enderecoCurto}
                        </Typography>
                      )}
                    </Box>

                    <CardContent sx={{ padding: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'League Spartan' }}>
                        Nota: {avaliacao.nota.toFixed(1)} ⭐
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, fontFamily: 'League Spartan' }}>
                        "{avaliacao.texto}"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default HomeCliente;
