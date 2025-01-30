import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import Navbar from "../../components/navbar/navbar";

const CadastrarRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");

  const criarRestaurante = async (nomeRestaurante, endereco) => {
    const tipoCliente = localStorage.getItem('tipo');
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    let idCliente = null;
    let idFuncionario = null;

    if (tipoCliente === 'cliente') {
      idCliente = usuario.idCliente;
      idFuncionario = null;
    } else {
      idCliente = null;
      idFuncionario = usuario.idCliente;
    }

    const url = 'http://localhost:8080/restaurante/createRestaurante';
    
    const restauranteData = {
      nomeRestaurante,
      endereco,
      idCliente,
      idFuncionario
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restauranteData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar restaurante');
      }

      const data = await response.json();
      console.log('Restaurante criado com sucesso:', data);
      // Limpar os campos após o sucesso
      setNomeRestaurante("");
      setEndereco("");
    } catch (error) {
      setErro("Erro ao criar restaurante. Tente novamente.");
      console.error('Erro ao enviar requisição:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeRestaurante || !endereco) {
      setErro("Todos os campos são obrigatórios.");
    } else {
      criarRestaurante(nomeRestaurante, endereco);
    }
  };

  return (
    <div>
      <Navbar />
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Restaurante
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nome do Restaurante"
            variant="outlined"
            fullWidth
            value={nomeRestaurante}
            onChange={(e) => setNomeRestaurante(e.target.value)}
          />
          <TextField
            label="Endereço"
            variant="outlined"
            fullWidth
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          
          {erro && (
            <Typography variant="body2" color="error">
              {erro}
            </Typography>
          )}

          <Button variant="contained" color="primary" type="submit">
            Cadastrar Restaurante
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CadastrarRestaurante;
