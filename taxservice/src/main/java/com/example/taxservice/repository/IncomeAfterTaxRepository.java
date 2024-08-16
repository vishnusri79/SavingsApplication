package com.example.taxservice.repository;

import com.example.taxservice.model.IncomeAfterTax;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeAfterTaxRepository extends JpaRepository<IncomeAfterTax, Long> {
}
