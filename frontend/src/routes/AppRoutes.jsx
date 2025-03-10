import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import AccountBookingInfoPage from "../pages/AccountBookingInfoPage";
import AccountDetails from "../components/AccountDetails";  // Importiert die Komponenten
import BookingDetails from "../components/BookingDetails";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/account-buchung" element={ <AccountBookingInfoPage />} />
            <Route path="/account-booking/account" element={<AccountDetails /> } />
            <Route path="/account-booking/booking" element={<BookingDetails />} />
            </Route>
            {/* Wenn ein nicht vorhandener Pfad aufgerufen wird */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
