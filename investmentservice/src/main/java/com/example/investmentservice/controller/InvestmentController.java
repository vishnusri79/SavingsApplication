package com.example.investmentservice.controller;

import com.example.investmentservice.model.HistoricalPrice;
import com.example.investmentservice.model.InvestmentType;
import com.example.investmentservice.service.InvestmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/investment")
@CrossOrigin(origins = "http://localhost:3000")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;

    @PostMapping("/calculate-amount")
    public ResponseEntity<Map<String, Double>> calculateAmountAndReturns(@RequestBody Map<String, Object> request) {
        double investment = ((Number) request.get("investment")).doubleValue();
        int year = (int) request.get("year");
        InvestmentType investmentType = InvestmentType.valueOf(((String) request.get("type")).toUpperCase());

        Map<String, Double> amountAndReturns = investmentService.calculateAmountAndReturns(investment, year, investmentType);
        return ResponseEntity.ok(amountAndReturns);
    }
    @GetMapping("/historical-prices")
    public ResponseEntity<List<HistoricalPrice>> getHistoricalPrices(@RequestParam String type) {
        InvestmentType investmentType = InvestmentType.valueOf(type.toUpperCase());
        List<HistoricalPrice> prices = investmentService.getHistoricalPrices(investmentType);
        return ResponseEntity.ok(prices);
    }

    @GetMapping("/historical-price")
    public ResponseEntity<Double> getHistoricalPriceByYear(@RequestParam int year, @RequestParam String type) {
        InvestmentType investmentType = InvestmentType.valueOf(type.toUpperCase());
        double price = investmentService.getHistoricalPrice(year, investmentType);
        return ResponseEntity.ok(price);
    }
}
