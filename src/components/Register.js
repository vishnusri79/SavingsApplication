import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        country: '',
        annualIncome: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/register', user)
            .then(response => {
                setMessage('User registered successfully!');
                setUser({
                    username: '',
                    email: '',
                    password: '',
                    country: '',
                    annualIncome: ''
                });
            })
            .catch(error => {
                setMessage('Error registering user.');
                console.error('There was an error registering the user!', error);
            });
    };

    return (
        <div className="register-container">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={user.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="annualIncome">Annual Income:</label>
                    <input
                        type="number"
                        id="annualIncome"
                        name="annualIncome"
                        value={user.annualIncome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Register;
