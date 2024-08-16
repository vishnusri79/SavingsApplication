package com.example.investmentservice.service;

import com.example.investmentservice.model.HistoricalPrice;
import com.example.investmentservice.model.InvestmentType;
import com.example.investmentservice.repository.HistoricalPriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InvestmentService {

    @Autowired
    private HistoricalPriceRepository historicalPriceRepository;

    // Method to get historical price
    public double getHistoricalPrice(int year, InvestmentType type) {
        return historicalPriceRepository.findByYearAndInvestmentType(year, type)
                .map(HistoricalPrice::getPricePerUnit)
                .orElseThrow(() -> new IllegalArgumentException("Price data not available for the given year"));
    }
    public List<HistoricalPrice> getHistoricalPrices(InvestmentType type) {
        return historicalPriceRepository.findAllByInvestmentType(type);
    }

    // Method to calculate the amount of gold/silver purchased in 2024 and predict returns
    public Map<String, Double> calculateAmountAndReturns(double investment, int year, InvestmentType type) {
        double pricePerUnit = getHistoricalPrice(2024, type);
        double amountPurchased = investment / pricePerUnit; // Amount in grams (gold) or kilograms (silver)

        Map<String, Double> returnsMap = new HashMap<>();
        returnsMap.put("amountPurchased", amountPurchased);

        if (year > 2024) {
            double futurePricePerUnit = getPredictedPrice(year, type);
            double expectedReturns = amountPurchased * futurePricePerUnit; // Value in the selected year
            returnsMap.put("expectedReturns", expectedReturns);
        } else {
            returnsMap.put("expectedReturns", investment);
        }

        return returnsMap;
    }

    // Method to get predicted price for a given year
    private double getPredictedPrice(int year, InvestmentType type) {
        double predictedPrice = 0.0;

        switch (type) {
            case GOLD:
                if (year == 2025) predictedPrice = 76074.60;
                else if (year == 2026) predictedPrice = 82307.40;
                else if (year == 2027) predictedPrice = 88540.20;
                else if (year == 2028) predictedPrice = 94773.00;
                break;

            case SILVER:
                if (year == 2025) predictedPrice = 74180.75;
                else if (year == 2026) predictedPrice = 79743.81;
                else if (year == 2027) predictedPrice = 91705.39;
                else if (year == 2028) predictedPrice = 100875.93;
                break;
        }

        return predictedPrice;
    }
}
