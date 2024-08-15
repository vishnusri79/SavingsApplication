import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SilverShow.css';

const SilverShow = () => {
    const [silverPrices, setSilverPrices] = useState([]);

    useEffect(() => {
        const fetchSilverPrices = async () => {
            try {
                const response = await axios.get('http://localhost:8084/api/investment/historical-prices?type=silver');
                setSilverPrices(response.data);
            } catch (error) {
                console.error('Error fetching silver prices:', error);
            }
        };

        fetchSilverPrices();
    }, []);

    return (
        <div className="silvershow-container">
            <h1 className="title">Historical Silver Prices</h1>
            <table className="price-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Price (Rs. per kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {silverPrices.map((price, index) => (
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

export default SilverShow;
