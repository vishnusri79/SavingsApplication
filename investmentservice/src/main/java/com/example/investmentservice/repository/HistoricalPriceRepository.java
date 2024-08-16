package com.example.investmentservice.repository;

import com.example.investmentservice.model.HistoricalPrice;
import com.example.investmentservice.model.InvestmentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface HistoricalPriceRepository extends JpaRepository<HistoricalPrice, Long> {
    Optional<HistoricalPrice> findByYearAndInvestmentType(int year, InvestmentType investmentType);
    List<HistoricalPrice> findAllByInvestmentType(InvestmentType investmentType);

}
