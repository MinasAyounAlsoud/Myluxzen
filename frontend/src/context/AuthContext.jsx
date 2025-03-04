
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkUserSession = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/me", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Benutzerdaten:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    const logout = async (navigate) => {
        try {
            await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
            navigate("/auth?register=false"); //  Nach Logout zur Login-Seite weiterleiten
        } catch (error) {
            console.error("Fehler beim Logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
