import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', credentials)
            .then(response => {
                setMessage('User logged in successfully!');
                localStorage.setItem('user', credentials.username);
                setCredentials({
                    username: '',
                    password: ''
                });
                navigate('/dashboard');
                window.location.reload();
            })
            .catch(error => {
                setMessage('Error logging in user.');
                console.error('There was an error logging in the user!', error);
            });
    };

    return (
        <div className="login-container">
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={credentials.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
