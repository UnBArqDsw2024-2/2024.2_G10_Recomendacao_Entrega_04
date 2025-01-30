import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import SignIn from './pages/sign-in/sign-in';
import CadastroPage from './pages/cadastro/cadastro';
import HomeCliente from './pages/home-cliente/home-cliente';
import HomeFuncionario from './pages/home-funcionario/home-funcionario';
import AvaliacaoPage from './pages/avaliacoes/avaliacao-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/restaurante" element={<SignIn />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/home-cliente" element={<HomeCliente />} /> 
        <Route path="/home-funcionario" element={<HomeFuncionario />} />
        <Route path="/avaliacoes/:idRestaurante" element={<AvaliacaoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
