import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext); // Prüfe, ob ein Benutzer eingeloggt ist

    if (loading) {
        return <div className="text-center text-gray-600 mt-10">Lade Benutzerinformationen...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
