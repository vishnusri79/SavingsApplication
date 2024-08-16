package com.example.taxservice.service;

import com.example.taxservice.model.IncomeAfterTax;
import com.example.taxservice.model.IncomeRequest;
import com.example.taxservice.repository.IncomeAfterTaxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TaxCalculationService {

    @Autowired
    private IncomeAfterTaxRepository incomeAfterTaxRepository;

    public IncomeAfterTax calculateAndSaveIncomeAfterTaxes(IncomeRequest incomeRequest) {
        double incomeAfterTaxes = calculateIncomeAfterTaxes(incomeRequest.getAnnualIncome());
        IncomeAfterTax incomeAfterTax = new IncomeAfterTax(null, incomeRequest.getUserId(), incomeAfterTaxes);
        return incomeAfterTaxRepository.save(incomeAfterTax);
    }

    private double calculateIncomeAfterTaxes(double annualIncome) {
        double taxRate = getTaxRate(annualIncome);
        return annualIncome - (annualIncome * taxRate);
    }

    private double getTaxRate(double income) {
        if (income <= 300000) {
            return 0;
        } else if (income <= 700000) {
            return 0.05;
        } else if (income <= 1000000) {
            return 0.1;
        } else if (income <= 1200000) {
            return 0.15;
        } else if (income <= 1500000) {
            return 0.2;
        } else {
            return 0.3;
        }
    }

    // Method to return the tax slabs
    public Map<String, String> getTaxSlabs() {
        Map<String, String> taxSlabs = new HashMap<>();
        taxSlabs.put("0 - 300000", "0%");
        taxSlabs.put("300001 - 700000", "5%");
        taxSlabs.put("700001 - 1000000", "10%");
        taxSlabs.put("1000001 - 1200000", "15%");
        taxSlabs.put("1200001 - 1500000", "20%");
        taxSlabs.put("Above 1500000", "30%");
        return taxSlabs;
    }
}
