package com.api.API.controllers;

import com.api.API.models.Cliente;
import com.api.API.models.Funcionario;
import com.api.API.services.ClienteService;
import com.api.API.services.FuncionarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/getAllCliente")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Cliente>> getAllClientes() {
        return ResponseEntity.ok(clienteService.getAllClientes());
    }

    @PostMapping("/createCliente")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Cliente newCliente = clienteService.createCliente(cliente);

        return ResponseEntity.ok(newCliente);
    }

    @GetMapping("/email")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Cliente> getClienteByEmail(@RequestParam String email) {
        return clienteService.getClienteByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
