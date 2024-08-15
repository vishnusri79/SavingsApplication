import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    const [hover, setHover] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/home');
    };

    return (
        <header className="header">
            <div 
                className="logo" 
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)}
            >
                <img src="/logo.png" alt="Logo" className="logo-image" />
                {hover && <h1 className="hover-text">Stay Calm</h1>}
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/goldshow">Gold</Link></li>
                    <li><Link to="/silvershow">Silver</Link></li>
                    <li><a href="#about">About</a></li>
                    {!isLoggedIn && location.pathname !== '/login' && (
                        <li><Link to="/login" className="btn login">Login</Link></li>
                    )}
                    {!isLoggedIn && location.pathname !== '/register' && (
                        <li><Link to="/register" className="btn signup">SignUp</Link></li>
                    )}
                    {isLoggedIn && (
                        <li><button onClick={handleSignOut} className="btn signout">SignOut</button></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
