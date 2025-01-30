import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, AppBar, Toolbar, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import logo from '../../assets/images/restaurante.png';

function CadastroPage() {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState<string>('cliente');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    unFederacao: '',
    cidade: '',
    cargo: '',
    telefone: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTipoUsuarioChange = (e: SelectChangeEvent) => {
    setTipoUsuario(e.target.value);
    setFormData({
      nome: '',
      email: '',
      senha: '',
      unFederacao: '',
      cidade: '',
      cargo: '',
      telefone: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const url = tipoUsuario === 'cliente' 
      ? 'http://localhost:8080/cliente/createCliente' 
      : 'http://localhost:8080/funcionario/createFuncionario';
    
    const body = tipoUsuario === 'cliente' 
      ? {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          unFederacao: formData.unFederacao,
          cidade: formData.cidade,
        }
      : {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          cargo: formData.cargo,
          telefone: formData.telefone,
        };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar usuário');

      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="cadastro-page">
      <AppBar position="static" color="default" style={{ padding: '0 20px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logo} alt="Logo" style={{ height: 50 }} />
          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/signin')}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" sx={{ marginTop: 10 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5">Cadastro</Typography>


          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Usuário</InputLabel>
            <Select value={tipoUsuario} onChange={handleTipoUsuarioChange}>
              <MenuItem value="cliente">Cliente</MenuItem>
              <MenuItem value="funcionario">Funcionário</MenuItem>
            </Select>
          </FormControl>

          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
            <TextField fullWidth margin="normal" label="Nome" name="nome" value={formData.nome} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Senha" type="password" name="senha" value={formData.senha} onChange={handleChange} required />


            {tipoUsuario === 'cliente' && (
              <>
                <TextField fullWidth margin="normal" label="UF" name="unFederacao" value={formData.unFederacao} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />
              </>
            )}

            {tipoUsuario === 'funcionario' && (
              <>
                <TextField fullWidth margin="normal" label="Cargo" name="cargo" value={formData.cargo} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
              </>
            )}

            {error && <Typography color="error">{error}</Typography>}
            
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Cadastrar
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default CadastroPage;
