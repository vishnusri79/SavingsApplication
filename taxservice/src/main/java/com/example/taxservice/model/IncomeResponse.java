package com.example.taxservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IncomeResponse {
    private double incomeAfterTaxes;
}
