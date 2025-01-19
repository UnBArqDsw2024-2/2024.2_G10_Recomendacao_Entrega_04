import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import { Container, Box, AppBar, Toolbar, TextField, Button } from '@mui/material';
import logo from '../../assets/images/restaurante.png';

function SignInPage() {
  return (
    <div className="signin-page">
      <main className="signin-main">
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
              <Button variant="outlined" color="primary">
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs" sx={{ marginTop: 15 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: 3, 
              backgroundColor: 'white', 
              borderRadius: 2, 
              boxShadow: 3 
            }}
          >
            <SignInForm />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default SignInPage;
