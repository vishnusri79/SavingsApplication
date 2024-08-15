package com.example.bankingservice.controller;

import com.example.bankingservice.model.Bank;
import com.example.bankingservice.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/banks")
@CrossOrigin(origins = "http://localhost:3000")
public class BankController {

    @Autowired
    private BankService bankService;

    @GetMapping
    public List<Bank> getAllBanks() {
        return bankService.getAllBanks();
    }

    @PostMapping("/add")
    public ResponseEntity<Bank> addBank(@RequestBody Bank bank) {
        Bank savedBank = bankService.saveBank(bank);
        return ResponseEntity.ok(savedBank);
    }

    @PostMapping("/calculate-maturity")
    public List<Map<String, Object>> calculateMaturity(@RequestBody Map<String, Object> request) {
        double principal = ((Number) request.get("principal")).doubleValue();
        int tenure = (int) request.get("tenure");  // Tenure passed from the frontend

        List<Bank> banks = bankService.getAllBanks();

        return banks.stream().map(bank -> {
            double rate = bankService.getRateForTenure(bank, tenure);
            double maturityAmount = bankService.calculateMaturityAmount(principal, rate, tenure);
            return Map.of(
                    "bankName", (Object) bank.getName(),
                    "interestRate", (Object) rate,
                    "maturityAmount", (Object) maturityAmount
            );
        }).collect(Collectors.toList());
    }
}

