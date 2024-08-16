package com.example.recurringdepositservice.controller;

import com.example.recurringdepositservice.model.RecurringBank;
import com.example.recurringdepositservice.service.RecurringDepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recurring-deposits")
@CrossOrigin(origins = "http://localhost:3000")
public class RecurringDepositController {

    @Autowired
    private RecurringDepositService recurringDepositService;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllBanks() {
        return ResponseEntity.ok(recurringDepositService.getAllBanks().stream().map(bank -> Map.of(
                "bankName", (Object) bank.getName(),
                "interestRate3Months", (Object) bank.getInterestRate3Months(),
                "interestRate6Months", (Object) bank.getInterestRate6Months(),
                "interestRate9Months", (Object) bank.getInterestRate9Months()
        )).collect(Collectors.toList()));
    }

    @PostMapping("/calculate-maturity")
    public ResponseEntity<List<Map<String, Object>>> calculateMaturity(@RequestBody Map<String, Object> request) {
        double savingsPerMonth = ((Number) request.get("savingsPerMonth")).doubleValue();
        int tenure = (int) request.get("tenure");

        List<Map<String, Object>> maturityAmounts = recurringDepositService.calculateMaturityAmounts(savingsPerMonth, tenure);
        return ResponseEntity.ok(maturityAmounts);
    }
    @PostMapping("/add-bank")
    public ResponseEntity<RecurringBank> addBank(@RequestBody RecurringBank bank) {
        RecurringBank savedBank = recurringDepositService.saveBank(bank);
        return ResponseEntity.ok(savedBank);
    }
}
