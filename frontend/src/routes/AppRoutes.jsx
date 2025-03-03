
// src/routes/AppRoutes.jsx (Routing mit korrektem Login-Verhalten)
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import AccountPage from "../pages/AccountPage";

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/auth" />} />
            <Route path="/account" element={<AccountPage />} />
        </Routes>
    );
};

export default AppRoutes; 

