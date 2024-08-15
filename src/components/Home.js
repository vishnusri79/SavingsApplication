import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
    const newsItems = [
        "Gold rate decreased by 1000 rupees today.",
        "Fixed deposit rates have increased by 0.5%.",
        "New tax-saving mutual funds launched this quarter.",
        "Recurring deposit accounts see a 20% increase in interest.",
        "Top banks are offering higher savings account interest rates.",
        "Mutual funds see record investments this year.",
        "Interest rates on home loans expected to rise.",
        "Government announces new tax deductions for investments.",
        "Stock market hits all-time high amid economic growth.",
        "Cryptocurrency gains traction as an alternative investment."
    ];

    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [newsItems.length]);

    return (
        <div className="home-container">
            <h1>Trending Plans</h1>
            <div className="cards-container">
                <div className="card">
                    <img src="/fixeddeposit.jpg" alt="Fixed Deposit" />
                    <div className="card-description">
                        <p>Fixed Deposit - Secure your future with guaranteed returns.</p>
                        <h5>HDFC BANK ~ 7 % *</h5>
                        <Link to="/login">Learn More</Link>
                    </div>
                </div>
                <div className="card">
                    <img src="/recurringdeposit.jpg" alt="Recurring Deposit" />
                    <div className="card-description">
                        <p>Recurring Deposit - Invest monthly and build your wealth.</p>
                        <h5>ICICI BANK ~ 4 % *</h5>
                        <Link to="/login">Learn More</Link>
                    </div>
                </div>
                <div className="card">
                    <img src="/gold3.jpg" alt="Gold Investment" />
                    <div className="card-description">
                        <p>Gold is not worth to buy, it is worth to invest.</p>
                        <h5>SBI BANK ~ 0.5 % *</h5>
                        <Link to="/login">Learn More</Link>
                    </div>
                </div>
                <div className="card">
                    <img src="/savings.webp" alt="Savings Account" />
                    <div className="card-description">
                        <p>Savings Account - Save and earn interest on your deposits.</p>
                        <h5>SBI BANK ~ 2.5 % *</h5>
                        <Link to="/login">Learn More</Link>
                    </div>
                </div>
            </div>
            <h2>Latest News</h2>
            <div className="news-ticker">
                <p className="news-text">{newsItems[currentNewsIndex]}</p>
            </div>
        </div>
    );
};

export default Home;
