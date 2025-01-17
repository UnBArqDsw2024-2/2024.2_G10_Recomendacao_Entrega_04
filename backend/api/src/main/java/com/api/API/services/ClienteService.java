package com.api.API.services;

import com.api.API.models.Cliente;
import com.api.API.models.Funcionario;
import com.api.API.repositories.ClienteRepository;
import com.api.API.repositories.FuncionarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Cliente createCliente(Cliente clienteSalvar) {
        Cliente cliente = new Cliente(clienteSalvar.getNome(), clienteSalvar.getEmail(),
                clienteSalvar.getSenha(), clienteSalvar.getUnFederacao(), clienteSalvar.getCidade());
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> getClienteByEmail(String email) {
        return clienteRepository.findFirstByEmail(email);
    }
}
