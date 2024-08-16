package com.example.investmentservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "historical_prices")
public class HistoricalPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int year;
    private double pricePerUnit; // Price per gram for gold or per kg for silver

    @Enumerated(EnumType.STRING)
    private InvestmentType investmentType; // GOLD or SILVER
}
