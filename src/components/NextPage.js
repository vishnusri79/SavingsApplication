import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NextPage.css';

const NextPage = () => {
    const location = useLocation();
    const incomeAfterTaxes = location.state?.incomeAfterTaxes || 0;
    const navigate = useNavigate();

    const handleFixedDepositClick = () => {
        navigate('/fixeddeposit', { state: { incomeAfterTaxes } });
    };

    const handleRecurringDepositClick = () => {
        navigate('/recurringdeposit', { state: { incomeAfterTaxes } });
    };

    const handleGoldInvestmentClick = () => {
        navigate('/goldinvestment', { state: { incomeAfterTaxes } });
    };

    const handleSilverInvestmentClick = () => {
        navigate('/silverinvestment', { state: { incomeAfterTaxes } });
    };

    return (
        <div className="nextpage-container">
            <h1 className="income-text">Income After Taxes: ₹ {incomeAfterTaxes.toFixed(2)}</h1>
            <h2 className="plans-heading">Plans</h2>
            <div className="cards-container">
                <div className="card">
                    <h3>Fixed Deposit</h3>
                    <p>Secure your future with guaranteed returns.</p>
                    <button onClick={handleFixedDepositClick} className="card-button">Learn More</button>
                </div>
                <div className="card">
                    <h3>Recurring Deposit</h3>
                    <p>Invest monthly and build your wealth steadily.</p>
                    <button onClick={handleRecurringDepositClick} className="card-button">Learn More</button>
                </div>
                <div className="card">
                    <h3>Gold Investment</h3>
                    <p>Invest in gold and diversify your portfolio.</p>
                    <button onClick={handleGoldInvestmentClick} className="card-button">Learn More</button>
                </div>
                <div className="card">
                    <h3>Silver Investment</h3>
                    <p>Silver is a smart way to secure your savings.</p>
                    <button onClick={handleSilverInvestmentClick} className="card-button">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default NextPage;
