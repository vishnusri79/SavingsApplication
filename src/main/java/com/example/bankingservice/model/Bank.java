package com.example.bankingservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "banks")
public class Bank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "interest_rate_1_year")
    private double interestRate1Year;

    @Column(name = "interest_rate_3_years")
    private double interestRate3Years;

    @Column(name = "interest_rate_5_years")
    private double interestRate5Years;
}
