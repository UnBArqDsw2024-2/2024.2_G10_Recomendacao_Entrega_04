// src/components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, TextField, Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/restaurante.png';
import { AccountCircle, AddCircle, ExitToApp, Restaurant } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState<boolean>(false);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    setUsuarioLogado(!!usuario);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuarioLogado(false);
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', padding: '0 20px', boxShadow: 3 }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <IconButton onClick={() => navigate('/')} sx={{ padding: 0.3 }}>
        <img src={logo} alt="Logo" style={{ height: 65 }} />
      </IconButton>
      <Box display="flex" alignItems="center" gap={2}>
        {usuarioLogado ? (
          <Box display={{ xs: 'none', md: 'flex' }} gap={2}>
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
          </Box>
        ) : (
          <>
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
