import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Card, CardContent, Typography, Grid, TextField, Box } from '@mui/material';
import logo from '../../assets/images/restaurante.png';
import { restauranteService } from '../../services/restauranteService';
import Navbar from '../../components/navbar/navbar';

interface Restaurante {
  idRestaurante: number;
  nomeRestaurante: string;
  endereco: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState<Restaurante[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [termoPesquisa, setTermoPesquisa] = useState<string>('');

  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    setUsuarioLogado(!!usuario); // Converte para booleano (true se existir, false se não)
  }, []);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const dados = await restauranteService.listar();
        setRestaurantes(dados);
        setRestaurantesFiltrados(dados); // Inicia com todos os restaurantes
      } catch (error) {
        setErro('Erro ao buscar restaurantes. Tente novamente mais tarde.');
      }
    };

    fetchRestaurantes();
  }, []);

  const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termo = e.target.value.toLowerCase();
    setTermoPesquisa(termo);

    if (termo === '') {
      setRestaurantesFiltrados(restaurantes); // Exibir todos os restaurantes se a pesquisa estiver vazia
    } else {
      const filtrados = restaurantes.filter(restaurante =>
        restaurante.nomeRestaurante.toLowerCase().includes(termo)
      );
      setRestaurantesFiltrados(filtrados);
    }
  };

  return (
    <div className="home-page">
      <Navbar />

      <div className="content" style={{ padding: '20px' }}>
      <TextField
              placeholder="Pesquisar..."
              variant="outlined"
              size="small"
              style={{ width: '200px' }}
              onChange={handlePesquisa}
            />
        {erro && (
          <Typography variant="h6" color="error" align="center">
            {erro}
          </Typography>
        )}

        {restaurantesFiltrados.length === 0 && termoPesquisa ? (
          <Typography variant="h6" align="center">
            Nenhum restaurante encontrado para "{termoPesquisa}"
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {restaurantesFiltrados.map((restaurante) => (
              <Grid item xs={12} sm={6} md={4} key={restaurante.idRestaurante}>
                <Card
                  style={{ cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  onClick={() => navigate(`/avaliacoes/${restaurante.idRestaurante}`)}
                >
                  <CardContent>
                    <Typography variant="h5">{restaurante.nomeRestaurante}</Typography>
                    <Typography variant="body2" color="text.secondary">{restaurante.endereco}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Home;
