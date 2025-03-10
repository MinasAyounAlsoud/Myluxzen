
import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BiUser, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import loginImage from "../assets/login-image.jpg"; 

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
                setUser(data);
                navigate("/"); // Nach Login zum Dashboard
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

return (
    <div className="h-screen w-screen flex flex-col lg:flex-row overflow-hidden">
   
        <div className="hidden lg:block fixed left-0 top-0 w-1/2 h-screen">
            <img src={loginImage} alt="Login Illustration" className="w-full h-full object-cover" />
        </div>


        <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-start lg:pl-5 pl-10 bg-white ml-auto">
            
 
          

            <form onSubmit={handleAuth} className="flex flex-col space-y-5 w-full  max-w-[400px]">

            <h1 className="text-3xl font-bold text-green-800 text-center w-full mb-20">
             {isRegister ? "Willkommen" : "Willkommen zurück!"}
             </h1>
             {isRegister && (
                        <>
                            <div className="relative flex items-center border-b border-gray-400">
                                <BiUser className="absolute left-2 text-gray-500" size={20} />
                                <input type="text" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)} className="w-full pl-8 py-3 bg-transparent focus:outline-none" />
                            </div>
                            <div className="relative flex items-center border-b border-gray-400">
                                <BiUser className="absolute left-2 text-gray-500" size={20} />
                                <input type="text" placeholder="Nachname" value={nachname} onChange={(e) => setNachname(e.target.value)} className="w-full pl-8 py-3 bg-transparent focus:outline-none" />
                            </div>
                        </>
                )}
                <div className="relative flex items-center border-b border-gray-400">
                    <BiEnvelope className="absolute left-2 text-gray-500" size={20} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-8 py-3 bg-transparent focus:outline-none" />
                </div>
                <div className="relative flex items-center border-b border-gray-400">
                    <BiLock className="absolute left-2 text-gray-500" size={20} />
                    <input type={showPassword ? "text" : "password"} placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-8 py-3 bg-transparent focus:outline-none" />
                    <button type="button" className="absolute right-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                    </button>
                </div>
                {isRegister && (
                    <div className="relative flex items-center border-b border-gray-400">
                        <BiLock className="absolute left-2 text-gray-500" size={20} />
                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Passwort bestätigen" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-8 py-3 bg-transparent focus:outline-none" />
                        <button type="button" className="absolute right-2 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                        </button>
                    </div>
                )}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <button type="submit" className="bg-green-800 text-white py-2 px-6 rounded-full hover:bg-green-700 transition shadow-md mt-6">
                    {isRegister ? "Registrieren" : "Einloggen"}
                </button>
            </form>

            <div className="text-left mt-10 mb-40 pl-16">
                <button onClick={() => navigate(`/auth?register=${!isRegister}`)} className="text-green-800">
                    {isRegister ? (
                        <>
                            Bereits ein Konto?{" "}
                            <span className="font-bold underline">Hier einloggen</span>
                        </>
                    ) : (
                        <>
                            Noch kein Konto?{" "}
                            <span className="font-bold underline">Hier registrieren</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
);


}
export default AuthPage;