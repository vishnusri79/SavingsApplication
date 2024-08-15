import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './RecurringDeposit.css';

const RecurringDeposit = () => {
    const location = useLocation();
    const [incomeAfterTaxes, setIncomeAfterTaxes] = useState(0);
    const [savingsPerMonth, setSavingsPerMonth] = useState('');
    const [tenure, setTenure] = useState(null);
    const [banks, setBanks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const income = location.state?.incomeAfterTaxes || 0;
        setIncomeAfterTaxes(income);
    }, [location.state]);

    const fetchBanks = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:8083/api/recurring-deposits/calculate-maturity', {
                savingsPerMonth: parseFloat(savingsPerMonth),
                tenure: tenure
            });
            setBanks(response.data);
        } catch (error) {
            console.error('Error fetching bank data:', error);
        }
    }, [savingsPerMonth, tenure]);

    useEffect(() => {
        if (tenure && savingsPerMonth && savingsPerMonth <= incomeAfterTaxes / 12) {
            fetchBanks();
        }
    }, [tenure, savingsPerMonth, fetchBanks, incomeAfterTaxes]);

    const handleSavingsChange = (e) => {
        const value = e.target.value;
        if (value * 12 > incomeAfterTaxes) {
            setError('Savings per month cannot exceed Income After Taxes.');
        } else {
            setError('');
            setSavingsPerMonth(value);
        }
    };

    const handleTenureClick = (months) => {
        setTenure(months);
    };

    return (
        <div className="recurringdeposit-container">
            <h1 className="income-text">Income After Taxes: ₹ {incomeAfterTaxes.toFixed(2)}</h1>
            
            <div className="input-section">
                <label className="section-title">Savings per Month:</label>
                <input
                    type="number"
                    value={savingsPerMonth}
                    onChange={handleSavingsChange}
                    className="savings-input"
                />
                {error && <p className="error">{error}</p>}
            </div>

            <div className="tenure-section">
                <h2 className="section-title">Select Tenure:</h2>
                <div className="tenure-buttons">
                    <button className={tenure === 3 ? "selected" : ""} onClick={() => handleTenureClick(3)}>3 Months</button>
                    <button className={tenure === 6 ? "selected" : ""} onClick={() => handleTenureClick(6)}>6 Months</button>
                    <button className={tenure === 9 ? "selected" : ""} onClick={() => handleTenureClick(9)}>9 Months</button>
                </div>
            </div>

            {tenure && savingsPerMonth && savingsPerMonth <= incomeAfterTaxes / 12 && (
                <div className="investment-section">
                    <h2 className="section-title">Total Invested: ₹ {(savingsPerMonth * tenure).toFixed(2)}</h2>
                    <div className="cards-container">
                        {banks.map((bank, index) => (
                            <div key={index} className="card">
                                <h3>{bank.bankName}</h3>
                                <p>Interest Rate: {bank.interestRate}%</p>
                                <p className="after-maturity">After Maturity: ₹ {bank.maturityAmount.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecurringDeposit;
