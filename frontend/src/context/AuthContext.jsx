import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        vorname: "Test",
        nachname: "Admin",
        email: "admin@example.com",
        isAuthenticated: true,  // ✅ Benutzer ist immer eingeloggt (nur für Tests)
        isAdmin: true,  // ✅ Ist Admin
    });
    const [loading, setLoading] = useState(true);

    //  Funktion, um den aktuellen Benutzer zu prüfen
    const checkUserSession = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/me", {
                method: "GET",
                credentials: "include", // ✅ WICHTIG für Cookies
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUser({ ...userData, 
                    isAuthenticated: true,
                    isAdmin: userData.isAdmin || false,
                }); // ✅ Benutzer setzen
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Benutzerdaten:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    // 📌 Logout-Funktion
    const logout = async () => {
        try {
            await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            setUser(null);
        } catch (error) {
            console.error("Fehler beim Logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
