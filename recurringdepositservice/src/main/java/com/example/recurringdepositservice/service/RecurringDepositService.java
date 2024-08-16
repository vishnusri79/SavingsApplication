package com.example.recurringdepositservice.service;

import com.example.recurringdepositservice.model.RecurringBank;
import com.example.recurringdepositservice.repository.RecurringBankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecurringDepositService {

    @Autowired
    private RecurringBankRepository recurringBankRepository;

    public List<RecurringBank> getAllBanks() {
        return recurringBankRepository.findAll();
    }

    public double calculateMaturityAmount(double principal, double rate, int months) {
        // This formula assumes monthly compounding interest
        return principal * Math.pow(1 + (rate / 100) / 12, months);
    }

    public List<Map<String, Object>> calculateMaturityAmounts(double principal, int tenure) {
        List<RecurringBank> banks = getAllBanks();

        return banks.stream().map(bank -> {
            double rate = getRateForTenure(bank, tenure);
            double maturityAmount = calculateMaturityAmount(principal, rate, tenure);

            // Creating a map with Object values to match the expected return type
            return Map.of(
                    "bankName", (Object) bank.getName(),
                    "interestRate", (Object) rate,
                    "maturityAmount", (Object) maturityAmount
            );
        }).collect(Collectors.toList());
    }

    private double getRateForTenure(RecurringBank bank, int tenure) {
        switch (tenure) {
            case 3: return bank.getInterestRate3Months();
            case 6: return bank.getInterestRate6Months();
            case 9: return bank.getInterestRate9Months();
            default: throw new IllegalArgumentException("Invalid tenure");
        }
    }

    public RecurringBank saveBank(RecurringBank bank) {
        return recurringBankRepository.save(bank);
    }
}
