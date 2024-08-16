package com.example.taxservice.model;

import lombok.Data;

@Data
public class IncomeRequest {
    private Long userId;
    private double annualIncome;
}
