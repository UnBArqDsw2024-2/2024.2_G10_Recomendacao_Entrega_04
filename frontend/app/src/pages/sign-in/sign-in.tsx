import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, AppBar, Toolbar, TextField, Button, Typography, Alert } from '@mui/material';
import logo from '../../assets/images/restaurante.png';

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      let userData;
      let tipoUsuario = '';

      const clienteResponse = await fetch(`http://localhost:8080/cliente/email?email=${formData.email}`);
      if (clienteResponse.ok) {
        userData = await clienteResponse.json();
        tipoUsuario = 'cliente';
      }

      if (!userData) {
        const funcionarioResponse = await fetch(`http://localhost:8080/funcionario/email?email=${formData.email}`);
        if (funcionarioResponse.ok) {
          userData = await funcionarioResponse.json();
          tipoUsuario = 'funcionario';
        }
      }

      if (!userData) {
        throw new Error('Usuário não encontrado');
      }

      if (userData.senha !== formData.senha) {
        throw new Error('Senha incorreta');
      }

      setSuccess(true);

      navigate(tipoUsuario === 'cliente' ? '/home-cliente' : '/home-funcionario');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-page">
      <AppBar position="static" color="default" style={{ padding: '0 20px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo} alt="Logo" style={{ height: 50 }} />
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/cadastro')}>
              Cadastrar
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
          <Typography variant="h5">Login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Login realizado com sucesso!</Alert>}
          
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Senha"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Entrar
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default SignInPage;
