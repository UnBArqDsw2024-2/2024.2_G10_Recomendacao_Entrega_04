import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/restaurante.png';
import { AccountCircle, AddCircle, ExitToApp, Restaurant } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const tipo = localStorage.getItem('tipo');

    if (usuario && tipo) {
      setUsuarioLogado(true);
      setTipoUsuario(tipo);

      const usuarioData = JSON.parse(usuario);
      if (tipo === 'cliente') {
        setIdUsuario(usuarioData.idCliente);
      } else if (tipo === 'funcionario') {
        setIdUsuario(usuarioData.idFuncionario);
      }
    } else {
      setUsuarioLogado(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo');
    setUsuarioLogado(false);
    navigate('/');
  };

  const handlePerfilClick = () => {
    if (tipoUsuario === 'cliente' && idUsuario) {
      navigate(`/home-cliente/${idUsuario}`);
    } else if (tipoUsuario === 'funcionario' && idUsuario) {
      navigate(`/home-funcionario/${idUsuario}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', padding: '0 20px', boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <IconButton onClick={() => navigate('/')} sx={{ padding: 0.3 }}>
          <img src={logo} alt="Logo" style={{ height: 65 }} />
        </IconButton>

        {/* Seção de botões à direita */}
        <Box display="flex" alignItems="center" gap={2}>
          {usuarioLogado ? (
            <Box display="flex" alignItems="center" gap={2}>
              {/* Botão de Logout */}
              <Button
                variant="outlined"
                sx={{
                  color: '#9c1d0e',
                  borderColor: '#9c1d0e',
                  '&:hover': { backgroundColor: '#9c1d0e', color: 'white' },
                }}
                startIcon={<ExitToApp />}
                onClick={handleLogout}
              >
                Logout
              </Button>

              {/* Botão de Cadastrar Restaurante (somente para funcionários) */}
              {tipoUsuario === 'funcionario' && (
                <Button
                  variant="outlined"
                  sx={{
                    color: '#44a49b',
                    borderColor: '#44a49b',
                    '&:hover': { backgroundColor: '#44a49b', color: 'white' },
                  }}
                  startIcon={<Restaurant />}
                  onClick={() => navigate('/cadastrar-restaurante')}
                >
                  Cadastrar Restaurante
                </Button>
              )}

              {/* Ícone de Perfil (Sem imagem, apenas ícone) */}
              <IconButton onClick={handlePerfilClick} sx={{ padding: 0 }}>
                <AccountCircle sx={{ fontSize: 40, color: '#9c1d0e' }} />
              </IconButton>
            </Box>
          ) : (
            <>
              {/* Botão de Cadastro */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#44a49b',
                  '&:hover': { backgroundColor: '#3a8d7b' },
                }}
                startIcon={<AddCircle />}
                onClick={() => navigate('/cadastro')}
              >
                Cadastrar
              </Button>

              {/* Botão de Login */}
              <Button
                variant="outlined"
                sx={{
                  color: '#9c1d0e',
                  borderColor: '#9c1d0e',
                  '&:hover': { backgroundColor: '#9c1d0e', color: 'white' },
                }}
                startIcon={<AccountCircle />}
                onClick={() => navigate('/signin')}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
