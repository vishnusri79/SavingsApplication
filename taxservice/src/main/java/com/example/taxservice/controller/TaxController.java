package com.example.taxservice.controller;

import com.example.taxservice.model.IncomeRequest;
import com.example.taxservice.model.IncomeResponse;
import com.example.taxservice.service.TaxCalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tax")
public class TaxController {

    @Autowired
    private TaxCalculationService taxCalculationService;

    @PostMapping("/calculate")
    public ResponseEntity<IncomeResponse> calculateIncomeAfterTaxes(@RequestBody IncomeRequest incomeRequest) {
        IncomeResponse response = new IncomeResponse(
                taxCalculationService.calculateAndSaveIncomeAfterTaxes(incomeRequest).getIncomeAfterTaxes()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/slabs")
    public ResponseEntity<Object> getTaxSlabs() {
        return ResponseEntity.ok(taxCalculationService.getTaxSlabs());
    }
}
