package com.api.API.services;

import com.api.API.models.Funcionario;
import com.api.API.models.Tag;
import com.api.API.repositories.FuncionarioRepository;
import com.api.API.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public List<Funcionario> getAllFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public Funcionario createFuncionario(Funcionario funcionarioSalvar) {
        Funcionario funcionario = new Funcionario(funcionarioSalvar.getNome(), funcionarioSalvar.getEmail(),
                funcionarioSalvar.getSenha(), funcionarioSalvar.getCargo(), funcionarioSalvar.getTelefone());
        return funcionarioRepository.save(funcionario);
    }

    public Optional<Funcionario> getFuncionarioByEmail(String email) {
        return funcionarioRepository.findFirstByEmail(email);
    }

    public Optional<Funcionario> getFuncionarioById(Integer id) {
        return funcionarioRepository.findById(id);
    }

}
