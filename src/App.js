import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home'; // Import the Home component
import NextPage from './components/NextPage';
import FixedDeposit from './components/Fixeddeposit';
import './App.css';
import RecurringDeposit from './components/RecurringDeposit';
import GoldInvestment from './components/Gold';
import SilverInvestment from './components/Silver';
import GoldShow from './components/GoldShow';
import SilverShow from './components/SilverShow';

const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('user');
    return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} /> {/* Default route to Home */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/goldshow" element={<GoldShow />} />
                    <Route path="/silvershow" element={<SilverShow />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/next-page" element={<PrivateRoute element={<NextPage />} />} />
                    <Route path="/fixeddeposit" element={<PrivateRoute element={<FixedDeposit />} />} />
                    <Route path="/recurringdeposit" element={<PrivateRoute element={<RecurringDeposit />} />} />
                    <Route path="/goldinvestment" element={<PrivateRoute element={<GoldInvestment />} />} />
                    <Route path="/silverinvestment" element={<PrivateRoute element={<SilverInvestment />} />} />
                    
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
