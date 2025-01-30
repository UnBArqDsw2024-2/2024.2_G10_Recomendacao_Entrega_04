// src/components/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/restaurante.png';

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
    <AppBar position="static" color="default" style={{ padding: '0 20px' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button>
        <img src={logo} alt="Logo" style={{ height: 50 }} onClick={() => navigate(`/`)}/>
        </Button>
        <Box display="flex" alignItems="center" gap={2}>
          {usuarioLogado ? (
          <Box display={{ xs: 'none', md: 'flex' }} gap={2}>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
            
            <Button variant="outlined" color="primary" onClick={() => navigate('/cadastrar-restaurante')}>
              Cadastrar novo restaurante
            </Button>
          </Box>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={() => navigate('/cadastro')}>
                Cadastrar
              </Button>
              <Button variant="outlined" color="primary" onClick={() => navigate('/signin')}>
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
