import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";

const CadastrarRestaurante = () => {
  const navigate = useNavigate();
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

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

      setSucesso(true);
      setErro("");

      setNomeRestaurante("");
      setEndereco("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErro("Erro ao criar restaurante. Tente novamente.");
      console.error('Erro ao enviar requisição:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeRestaurante || !endereco) {
      setErro("Todos os campos são obrigatórios.");
      setSucesso(false);
    } else {
      criarRestaurante(nomeRestaurante, endereco);
    }
  };

  return (
    <div className="cadastrar-restaurante">
      <Navbar />

      <Container component="main" maxWidth="md" sx={{ marginTop: 5, marginBottom: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            borderColor: "#44a49b",
            borderStyle: "solid",
            borderWidth: 1,
          }}
        >
          <Typography variant="h5">CADASTRAR RESTAURANTE</Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Nome do Restaurante"
              variant="outlined"
              value={nomeRestaurante}
              onChange={(e) => setNomeRestaurante(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Endereço"
              variant="outlined"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />

            {erro && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {erro}
              </Alert>
            )}

            {sucesso && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Restaurante cadastrado com sucesso! Redirecionando...
              </Alert>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: "#44a49b" }}>
              Cadastrar Restaurante
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default CadastrarRestaurante;
