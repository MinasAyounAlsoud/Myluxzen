import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BiUser, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import loginImage from "../assets/imageNaheeda/login-image.jpg"; 
import { Link } from "react-router-dom";
import LoginRegestrieren from "../components/User/LoginRegestrieren"; 

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    // Liest "register" Parameter aus der URL (true oder false)
    const queryParams = new URLSearchParams(location.search);
    const initialIsRegister = queryParams.get("register") === "true";

    const [isRegister, setIsRegister] = useState(initialIsRegister);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const passwordRequirements = "Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    useEffect(() => {
        setIsRegister(initialIsRegister);
        setError(""); // Fehler zurücksetzen, wenn sich die Seite ändert
    }, [initialIsRegister]);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        
        if (!passwordRegex.test(value)) {
            setPasswordError(passwordRequirements);
        } else {
            setPasswordError("");
        }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Bitte fülle alle Felder aus.");
            return;
        }
    

        if (isRegister && (!vorname || !nachname)) {
            setError("Bitte Vorname und Nachname eingeben.");
            return;
        }
        if (isRegister && password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein.");
            return;
        }

        const endpoint = isRegister 
            ? "http://localhost:3000/api/auth/register" 
            : "http://localhost:3000/api/auth/login";

            const bodyData = isRegister
            ? { vorname, nachname, email, password }
            : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.message.includes("existiert bereits")) {
                    setError("Diese E-Mail-Adresse wird bereits verwendet.");
                } else {
                    setError(data.message || "E-Mail oder Passwort ist falsch.");
                }
                return;
            }

            if (isRegister) {
                //  Registrierung war erfolgreich, setze alle Eingaben auf leer!
                setVorname("");
                setNachname("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                // Wechsel zur Login-Seite, aber Benutzer muss selbst die Daten eingeben
                navigate("/auth?register=false");
            } else {
                setUser({
                    ...data,
                    isAuthenticated: true,  // ✅ Sicherstellen, dass der Benutzer als eingeloggt gilt
                    isAdmin: data.isAdmin || false,  // ✅ Falls `isAdmin` fehlt, setze `false`
                });
        
                  //  Admins gehen ins Admin-Dashboard, normale User zur normalen Startseite
            navigate(data.isAdmin ? "/admin" : "/");
            }
        } catch (error) {
            console.error("Fehler bei der Authentifizierung:", error);
            setError("E-Mail oder Passwort ist falsch");
        }
    };

   
useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // Scrollen deaktivieren
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
        document.documentElement.style.overflow = "auto"; // Scroll wieder aktivieren, falls nötig
    };
}, []);
const Header = () => {
    return (
        <header className="sticky top-0 w-full bg-white shadow-md flex justify-between items-center px-6 py-3 z-50">
            {/* Links: Logo */}
            <h1 className="text-xl font-semibold text-green-800">MeinDashboard</h1>

            {/* Rechts: Home-Link + Profil-Menü */}
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 text-lg hover:text-gray-500 transition">
                    Home
                </Link>
                <LoginRegestrieren />
            </div>
        </header>
    );
};

return (
    <div>
        <Header />
        <div className="h-screen w-screen flex">
            {/* Linke Seite: Bild */}
            <div className="hidden lg:block w-1/2 h-full">
                <img src={loginImage} alt="Login Illustration"
                     className="w-full h-full  object-cover object-[center] md:object-[25%_50%]"/>
            </div>

            {/* Rechte Seite: Formular */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center bg-white px-16">
                <div className="w-full max-w-[500px]">
                    <h1 className="text-4xl font-semibold text-[#0e5756] text-center mb-14" 
                        style={{ fontFamily: 'Merriweather, serif' }}>
                        {isRegister ? "Willkommen" : "Willkommen zurück!"}
                    </h1>

                    <form onSubmit={handleAuth} className="flex flex-col space-y-6">
                        {isRegister && (
                            <>
                                <div className="relative flex items-center border-b border-gray-400">
                                    <BiUser className="absolute left-2 text-gray-500" size={20} />
                                    <input type="text" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)}
                                        className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                                </div>
                                <div className="relative flex items-center border-b border-gray-400">
                                    <BiUser className="absolute left-2 text-gray-500" size={20} />
                                    <input type="text" placeholder="Nachname" value={nachname} onChange={(e) => setNachname(e.target.value)}
                                        className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                                </div>
                            </>
                        )}

                        <div className="relative flex items-center border-b border-gray-400">
                            <BiEnvelope className="absolute left-2 text-gray-500" size={20} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                        </div>

                        <div className="relative flex items-center border-b border-gray-400">
                            <BiLock className="absolute left-2 text-gray-500" size={20} />
                            <input type={showPassword ? "text" : "password"} placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                            <button type="button" className="absolute right-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                            </button>
                        </div>

                        {isRegister && (
                            <div className="relative flex items-center border-b border-gray-400">
                                <BiLock className="absolute left-2 text-gray-500" size={20} />
                                <input type={showConfirmPassword ? "text" : "password"} placeholder="Passwort bestätigen" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                                <button type="button" className="absolute right-2 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                                </button>
                            </div>
                        )}

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button type="submit"
                            className="bg-[#116769] text-white py-2.5 px-6 mt-8 rounded-full hover:bg-[#0e5756] transition shadow-md">
                            {isRegister ? "Registrieren" : "Einloggen"}
                        </button>
                    </form>

                    <div className="text-center mt-10">
                        <button onClick={() => navigate(`/auth?register=${!isRegister}`)}
                            className="text-[#0e5756] font-medium hover:text-[#116769] transition">
                            {isRegister ? (
                                <>Bereits ein Konto? <span className="font-bold underline">Hier einloggen</span></>
                            ) : (
                                <>Noch kein Konto? <span className="font-bold underline">Hier registrieren</span></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default AuthPage;