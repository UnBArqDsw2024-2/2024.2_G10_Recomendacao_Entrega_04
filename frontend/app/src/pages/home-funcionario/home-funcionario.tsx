import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Navbar from '../../components/navbar/navbar';

interface Restaurante {
  idRestaurante: number;
  nomeRestaurante: string;
  endereco: string;
}

interface AvaliacaoInfo {
  mediaNotas: number | null;
  totalAvaliacoes: number | null;
}

const RestaurantesFuncionario: React.FC = () => {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [cargo, setCargo] = useState<string | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<{ [key: number]: AvaliacaoInfo }>({});

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const tipo = localStorage.getItem('tipo');

    if (!usuario || tipo !== 'funcionario') {
      navigate('/');
      return;
    }

    const { idFuncionario } = JSON.parse(usuario);

    // Buscar restaurantes associados ao funcionário
    const fetchRestaurantes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/restaurante/funcionario?idFuncionario=${idFuncionario}`);
        if (!response.ok) throw new Error('Erro ao buscar restaurantes');
        const data = await response.json();
        setRestaurantes(data);

        // Buscar avaliações de cada restaurante
        data.forEach((restaurante: Restaurante) => fetchAvaliacoes(restaurante.idRestaurante));
      } catch (error) {
        console.error('Erro ao buscar restaurantes:', error);
      }
    };

    // Buscar cargo do funcionário
    const fetchCargo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/funcionario/id?idFuncionario=${idFuncionario}`);
        if (!response.ok) throw new Error('Erro ao buscar cargo');
        const data = await response.json();
        setCargo(data.cargo);
      } catch (error) {
        console.error('Erro ao buscar cargo do funcionário:', error);
      }
    };

    fetchRestaurantes();
    fetchCargo();
  }, [navigate]);

  // Função para buscar avaliações de um restaurante
  const fetchAvaliacoes = async (idRestaurante: number) => {
    try {
      const response = await fetch(`http://localhost:8080/avaliacao/restaurante?idRestaurante=${idRestaurante}`);
      if (!response.ok) throw new Error('Erro ao buscar avaliações');

      const data = await response.json();
      if (data.length > 0) {
        const totalAvaliacoes = data.length;
        const mediaNotas =
          data.reduce((acc: number, avaliacao: any) => acc + avaliacao.nota, 0) / totalAvaliacoes;

        setAvaliacoes((prev) => ({
          ...prev,
          [idRestaurante]: { mediaNotas, totalAvaliacoes },
        }));
      } else {
        setAvaliacoes((prev) => ({
          ...prev,
          [idRestaurante]: { mediaNotas: null, totalAvaliacoes: null },
        }));
      }
    } catch (error) {
      console.error(`Erro ao buscar avaliações para o restaurante ${idRestaurante}:`, error);
      setAvaliacoes((prev) => ({
        ...prev,
        [idRestaurante]: { mediaNotas: null, totalAvaliacoes: null },
      }));
    }
  };

  // Função para formatar o cargo (primeira letra maiúscula, resto minúsculo)
  const formatarCargo = (cargo: string) => {
    return cargo.charAt(0).toUpperCase() + cargo.slice(1).toLowerCase();
  };

  return (
    <div className="restaurantes-funcionario">
      <Navbar />

      <div className="content" style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          Meus Restaurantes
        </Typography>

        {restaurantes.length === 0 ? (
          <Typography variant="h6" align="center">
            Você não está vinculado a nenhum restaurante.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {restaurantes.map((restaurante) => {
              const enderecoCurto =
                restaurante.endereco.length > 20 ? restaurante.endereco.slice(0, 20) + '...' : restaurante.endereco;

              return (
                <Grid item xs={12} sm={6} md={4} key={restaurante.idRestaurante}>
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
                        {restaurante.nomeRestaurante}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'League Spartan' }}>
                        {enderecoCurto}
                      </Typography>
                      {cargo && (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ fontFamily: 'League Spartan', fontSize: '0.75rem', display: 'block', marginTop: 0.5 }}
                        >
                          {formatarCargo(cargo)}
                        </Typography>
                      )}
                    </Box>

                    <CardContent sx={{ padding: 3 }}>
                      {avaliacoes[restaurante.idRestaurante]?.totalAvaliacoes !== null ? (
                        <>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontFamily: 'League Spartan', fontSize: '0.85rem', fontWeight: 'bold' }}
                          >
                            Média de avaliações: {avaliacoes[restaurante.idRestaurante]?.mediaNotas?.toFixed(2)} ⭐
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontFamily: 'League Spartan', fontSize: '0.85rem' }}
                          >
                            Total de avaliações: {avaliacoes[restaurante.idRestaurante]?.totalAvaliacoes}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontFamily: 'League Spartan', fontSize: '0.85rem', fontStyle: 'italic' }}
                        >
                          Ainda não foi avaliado.
                        </Typography>
                      )}
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

export default RestaurantesFuncionario;
