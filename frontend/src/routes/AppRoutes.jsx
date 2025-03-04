import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import AccountBuchungPage from "../pages/AccountBuchungPage";
import AccountDetails from "../components/AccountDetails";  // Importiert die Komponenten
import BuchungDetails from "../components/BuchungDetails";

const AppRoutes = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* Kombinierte Account & Buchung Page */}
            <Route path="/account-buchung" element={ user ?<AccountBuchungPage /> : <Navigate to="/auth" />} />
            <Route path="/account-buchung/account" element={ user ?<AccountDetails /> : <Navigate to="/auth" />} />
            <Route path="/account-buchung/buchungen" element={ user ?<BuchungDetails /> : <Navigate to="/auth" />} />

            {/* Wenn ein nicht vorhandener Pfad aufgerufen wird */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
