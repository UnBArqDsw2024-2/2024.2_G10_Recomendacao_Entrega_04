import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Autocomplete } from '@mui/material';
import Navbar from '../../components/navbar/navbar';

const estadosBrasileiros = [
  { sigla: "AC", nome: "Acre" }, { sigla: "AL", nome: "Alagoas" }, { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" }, { sigla: "BA", nome: "Bahia" }, { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" }, { sigla: "ES", nome: "Espírito Santo" }, { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" }, { sigla: "MT", nome: "Mato Grosso" }, { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" }, { sigla: "PA", nome: "Pará" }, { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" }, { sigla: "PE", nome: "Pernambuco" }, { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" }, { sigla: "RN", nome: "Rio Grande do Norte" }, { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" }, { sigla: "RR", nome: "Roraima" }, { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" }, { sigla: "SE", nome: "Sergipe" }, { sigla: "TO", nome: "Tocantins" }
];


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

  const handleUFChange = (event: any, newValue: { sigla: string; nome: string } | null) => {
    setFormData({ ...formData, unFederacao: newValue ? newValue.sigla : '' });
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

      const responseData = await response.json();
      const idCliente = responseData.idCliente || responseData.idFuncionario; 
      localStorage.setItem('usuario', JSON.stringify({ idCliente })); 
      localStorage.setItem('tipo', tipoUsuario); 
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="cadastro-page">
      <Navbar />

      <Container component="main" maxWidth="md" sx={{ marginTop: 5, marginBottom: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3,
          borderColor: '#44a49b', borderStyle: 'solid', borderWidth: 1
         }}>
          <Typography variant="h5">CADASTRE-SE</Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="tipo-usuario">Tipo de Usuário</InputLabel>
            <Select
              id="tipo-usuario"
              value={tipoUsuario}
              onChange={handleTipoUsuarioChange}
              label="Tipo de Usuário"
            >
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
                <Autocomplete
                  fullWidth
                  options={estadosBrasileiros}
                  getOptionLabel={(option) => `${option.nome} (${option.sigla})`}
                  onChange={handleUFChange}
                  renderInput={(params) => <TextField {...params} label="UF" margin="normal" />}
                />
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
            
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#44a49b' }}>
              Cadastrar
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default CadastroPage;
