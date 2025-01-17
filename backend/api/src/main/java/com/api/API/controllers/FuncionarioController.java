package com.api.API.controllers;


import com.api.API.models.Cliente;
import com.api.API.models.Funcionario;
import com.api.API.services.FuncionarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping("/getAllFuncionario")
    public ResponseEntity<List<Funcionario>> getAllFuncionarios() {
        return ResponseEntity.ok(funcionarioService.getAllFuncionarios());
    }

    @PostMapping("/createFuncionario")
    public ResponseEntity<Funcionario> createFuncionario(@RequestBody Funcionario funcionario) {
        Funcionario newFuncionario = funcionarioService.createFuncionario(funcionario);

        return ResponseEntity.ok(newFuncionario);
    }

    @GetMapping("/email")
    public ResponseEntity<Funcionario> getFuncionarioByEmail(@RequestParam String email) {
        return funcionarioService.getFuncionarioByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


}
