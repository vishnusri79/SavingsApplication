import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Investment.css';

const SilverInvestment = () => {
    const location = useLocation();
    const [incomeAfterTaxes, setIncomeAfterTaxes] = useState(0);
    const [investment, setInvestment] = useState('');
    const [selectedYear, setSelectedYear] = useState(null);
    const [silverRate, setSilverRate] = useState(0);
    const [expectedReturns, setExpectedReturns] = useState(0);
    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];

    useEffect(() => {
        const income = location.state?.incomeAfterTaxes || 0;
        setIncomeAfterTaxes(income);
    }, [location.state]);

    const handleInvestmentChange = (e) => {
        setInvestment(e.target.value);
    };

    const handleYearClick = async (year) => {
        setSelectedYear(year);
        setExpectedReturns(null);  // Reset expected returns
        setSilverRate(0);  // Reset gold rate
    
        if (year <= 2024) {
            // Fetch historical price for the selected year
            try {
                const response = await axios.get(`http://localhost:8084/api/investment/historical-price?year=${year}&type=silver`);
                const priceForYear = response.data;
                setSilverRate(priceForYear);
                setExpectedReturns(null); // Clear expected returns since this is a historical price
            } catch (error) {
                console.error('Error fetching historical price:', error);
            }
        } else {
            // Fetch predicted price and calculate expected returns for future years
            try {
                const response = await axios.post('http://localhost:8084/api/investment/calculate-amount', {
                    investment: parseFloat(investment),
                    year: year,
                    type: 'silver'
                });
                setSilverRate(response.data.predictedPrice);
                setExpectedReturns(response.data.expectedReturns);
            } catch (error) {
                console.error('Error calculating expected returns:', error);
            }
        }
    };

    return (
        <div className="investment-container">
            <h1 className="income-text">Income After Taxes: ₹ {incomeAfterTaxes.toFixed(2)}</h1>
            
            <div className="input-section">
                <label className="section-title">Investment On Silver Per Year:</label>
                <input
                    type="number"
                    value={investment}
                    onChange={handleInvestmentChange}
                    className="investment-input"
                />
            </div>

            <div className="year-buttons">
                {years.map((year) => (
                    <button
                        key={year}
                        className={selectedYear === year ? "selected" : ""}
                        onClick={() => handleYearClick(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {silverRate > 0 && (
                <div className="silver-rate">
                    <p>Silver Rate in {selectedYear}: ₹ {silverRate.toFixed(2)} {selectedYear > 2024 ? "(Predicted)" : ""}</p>
                </div>
            )}

            {selectedYear > 2024 && expectedReturns > 0 && (
                <div className="expected-returns">
                    <p>Expected Returns in {selectedYear}: ₹ {expectedReturns.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default SilverInvestment;
