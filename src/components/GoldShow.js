import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoldShow.css';

const GoldShow = () => {
    const [goldPrices, setGoldPrices] = useState([]);

    useEffect(() => {
        const fetchGoldPrices = async () => {
            try {
                const response = await axios.get('http://localhost:8084/api/investment/historical-prices?type=gold');
                setGoldPrices(response.data);
            } catch (error) {
                console.error('Error fetching gold prices:', error);
            }
        };

        fetchGoldPrices();
    }, []);

    return (
        <div className="goldshow-container">
            <h1 className="title">Historical Gold Prices</h1>
            <table className="price-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Price (Rs. per 10 grams)</th>
                    </tr>
                </thead>
                <tbody>
                    {goldPrices.map((price, index) => (
                        <tr key={index}>
                            <td>{price.year}</td>
                            <td>₹{price.pricePerUnit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GoldShow;
