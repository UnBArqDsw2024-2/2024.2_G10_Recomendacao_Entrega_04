import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Card, CardContent, Typography, Grid, TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/images/restaurante.png';
import defaultImg from '../../assets/images/default-imagem2.webp';
import bg from '../../assets/images/bg.jpg';
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
    setUsuarioLogado(!!usuario); 
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
          style={{
            width: '100%', 
            backgroundColor: '#e7efee',
            borderRadius: '8px',
            padding: '5px',
            marginBottom: '20px', 
          }}
          onChange={handlePesquisa}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9c1d0e' }} />
              </InputAdornment>
            ),
          }}
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
        sx={{
          fontFamily: "League Spartan",
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s',
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
          borderRadius: 5,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onClick={() => navigate(`/avaliacoes/${restaurante.idRestaurante}`)}
      >
        <Box
          sx={{
            width: '100%',
            height: 150,
            backgroundImage: `url(${defaultImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        ></Box>

        <CardContent sx={{ padding: 3 }}>
          <Typography color="#1b1b1b" variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'League Spartan', textTransform: 'uppercase' }}>
            {restaurante.nomeRestaurante}
          </Typography>
          <Typography variant="body2" color="#1b1b1b" sx={{ marginTop: 1, fontFamily: "League Spartan", }}>
            {restaurante.endereco}
          </Typography>
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
