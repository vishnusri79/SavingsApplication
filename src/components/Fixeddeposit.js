import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FixedDeposit.css';

const FixedDeposit = () => {
    const location = useLocation();
    const [incomeAfterTaxes, setIncomeAfterTaxes] = useState(0);
    const [savingsPerYear, setSavingsPerYear] = useState('');
    const [tenure, setTenure] = useState(null);
    const [banks, setBanks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const income = location.state?.incomeAfterTaxes || 0;
        setIncomeAfterTaxes(income);
    }, [location.state]);

    const fetchBanks = useCallback(async () => {
        if (!tenure || !savingsPerYear) return;

        try {
            const response = await axios.post('http://localhost:8082/api/banks/calculate-maturity', {
                principal: parseFloat(savingsPerYear),
                tenure: tenure // Passing the selected tenure to the backend
            });
            setBanks(response.data);
        } catch (error) {
            console.error('Error fetching bank data:', error);
        }
    }, [savingsPerYear, tenure]);

    useEffect(() => {
        if (tenure && savingsPerYear && savingsPerYear <= incomeAfterTaxes) {
            fetchBanks();
        }
    }, [tenure, savingsPerYear, fetchBanks, incomeAfterTaxes]);

    const handleSavingsChange = (e) => {
        const value = e.target.value;
        if (value > incomeAfterTaxes) {
            setError('Savings per year cannot exceed Income After Taxes.');
        } else {
            setError('');
            setSavingsPerYear(value);
        }
    };

    const handleTenureClick = (years) => {
        setTenure(years);
    };

    return (
        <div className="fixeddeposit-container">
            <h1 className="income-text">Income After Taxes: ₹ {incomeAfterTaxes.toFixed(2)}</h1>
            
            <div className="input-section">
                <label className="section-title">Savings per Year:</label>
                <input
                    type="number"
                    value={savingsPerYear}
                    onChange={handleSavingsChange}
                    max={incomeAfterTaxes}
                    className="savings-input"
                />
                {error && <p className="error">{error}</p>}
            </div>

            <div className="tenure-section">
                <h2 className="section-title">Select Tenure:</h2>
                <div className="tenure-buttons">
                    <button className={tenure === 1 ? "selected" : ""} onClick={() => handleTenureClick(1)}>1 Year</button>
                    <button className={tenure === 3 ? "selected" : ""} onClick={() => handleTenureClick(3)}>3 Years</button>
                    <button className={tenure === 5 ? "selected" : ""} onClick={() => handleTenureClick(5)}>5 Years</button>
                </div>
            </div>

            {tenure && savingsPerYear && savingsPerYear <= incomeAfterTaxes && (
                <div className="investment-section">
                    <h2 className="section-title">Total Invested: ₹ {(savingsPerYear * tenure).toFixed(2)}</h2>
                    <div className="cards-container">
                        {banks.map((bank, index) => (
                            <div key={index} className="card">
                                <h3>{bank.bankName}</h3>
                                <p>Interest Rate: {bank.interestRate}%</p>
                                <p className="after-maturity">After Maturity: ₹ {bank.maturityAmount.toFixed(2)} p.a</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FixedDeposit;
