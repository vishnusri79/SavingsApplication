package com.example.bankingservice.service;

import com.example.bankingservice.model.Bank;
import com.example.bankingservice.repository.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class BankService {

    private static final Logger logger = LoggerFactory.getLogger(BankService.class);

    @Autowired
    private BankRepository bankRepository;

    public List<Bank> getAllBanks() {
        return bankRepository.findAll();
    }

    public Bank saveBank(Bank bank) {
        Bank savedBank = bankRepository.save(bank);
        logger.info("Bank data inserted successfully: {}", savedBank);
        return savedBank;
    }

    public double calculateMaturityAmount(double principal, double rate, int years) {
        return principal * Math.pow(1 + rate / 100, years);
    }
    public double getRateForTenure(Bank bank, int tenure) {
        switch (tenure) {
            case 1: return bank.getInterestRate1Year();
            case 3: return bank.getInterestRate3Years();
            case 5: return bank.getInterestRate5Years();
            default: throw new IllegalArgumentException("Invalid tenure");
        }
    }
}
