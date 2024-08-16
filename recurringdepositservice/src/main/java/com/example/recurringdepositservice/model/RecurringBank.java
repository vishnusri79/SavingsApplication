package com.example.recurringdepositservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;


@Entity
@Table(name = "recurring_banks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecurringBank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "bank_name", nullable = false)
    private String name;

    @Column(name = "interest_rate_3_months", nullable = false)
    private double interestRate3Months;

    @Column(name = "interest_rate_6_months", nullable = false)
    private double interestRate6Months;

    @Column(name = "interest_rate_9_months", nullable = false)
    private double interestRate9Months;
}
