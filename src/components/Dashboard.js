import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [annualIncome, setAnnualIncome] = useState('');
    const [incomeAfterTaxes, setIncomeAfterTaxes] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        setUsername(user);
    }, []);

    const handleChange = (e) => {
        setAnnualIncome(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/api/tax/calculate', {
                annualIncome: parseFloat(annualIncome),
            });
            setIncomeAfterTaxes(response.data.incomeAfterTaxes);
        } catch (error) {
            console.error('There was an error calculating the income after taxes!', error);
        }
    };

    const handleProceed = () => {
        navigate('/next-page', { state: { incomeAfterTaxes } });
    };

    return (
        <div className="dashboard-container">
            <h1 className="username">Hello, {username}</h1>
            <div className="info-section">
                <label className="country-label">Please Select Your Country:</label>
                <select name="country" className="country-select" defaultValue="India">
                    <option value="India">India</option>
                </select>
                <label className="income-label">Please enter Your Annual Income:</label>
                <div className="income-input-wrapper">
                    <span className="currency-symbol">₹</span>
                    <input 
                        type="number" 
                        name="annualIncome" 
                        className="income-input"
                        value={annualIncome} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                {incomeAfterTaxes === null ? (
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                ) : (
                    <button onClick={handleProceed} className="proceed-button">Proceed</button>
                )}
                {incomeAfterTaxes !== null && (
                    <div className="income-display">
                        <h2>Income After Taxes: ₹ {incomeAfterTaxes.toFixed(2)}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
