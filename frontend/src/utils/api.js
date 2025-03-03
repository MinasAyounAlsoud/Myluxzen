// src/utils/api.js (API-Helper für Backend-Anfragen)
import axios from 'axios';

const API = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const fetchUserProfile = async () => {
    const { data } = await API.get('/users/profile');
    return data;
};

export const fetchBookings = async () => {
    const { data } = await API.get('/bookings');
    return data;
};

export const fetchPayments = async () => {
    const { data } = await API.get('/payments');
    return data;
};

export default API;
