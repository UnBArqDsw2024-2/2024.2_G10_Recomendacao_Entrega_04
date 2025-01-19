import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Card, CardContent, Typography, Grid, TextField, Box } from '@mui/material';
import logo from '../../assets/images/restaurante.png';
import { restauranteService } from '../../services/restauranteService';

interface Restaurante {
  idRestaurante: number;
  nomeRestaurante: string;
  endereco: string;
  idCliente: number;
  idFuncionario: number;
}

const Home = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const dados = await restauranteService.listar();
        setRestaurantes(dados);
        console.log('Restaurantes:', dados);
      } catch (error) {
        console.error('Erro ao buscar restaurantes:', error);
      }
    };

    fetchRestaurantes();
  }, []);

  return (
    <div className="home-page">
      <AppBar position="static" color="default" style={{ padding: '0 20px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo} alt="Logo" style={{ height: 50 }} />

          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              placeholder="Pesquisar..."
              variant="outlined"
              size="small"
              style={{ width: '200px' }}
            />
            <Button variant="contained" color="primary">
              Cadastrar
            </Button>
            <Button variant="outlined" color="primary" onClick={() => window.location.href = '/signin'}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="content" style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          {restaurantes.map((restaurante) => (
            <Grid item xs={12} sm={6} md={4} key={restaurante.idRestaurante}>
              <Card
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {restaurante.nomeRestaurante}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurante.endereco}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
