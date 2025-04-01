import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BiUser, BiEnvelope, BiLock, BiShow, BiHide } from "react-icons/bi";
import loginImage from "../assets/imageNaheeda/login-image.jpg"; 
import NavbarMini from "../components/navbarMini/NavbarMini";
import useServerErrorHandler from "../components/User/ErrorHandler";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, setUser } = useContext(AuthContext);

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
    const [errors, setErrors] = useState({});
    const [passwordError, setPasswordError] = useState("");
    const errorHandler = useServerErrorHandler(setErrors);
    
    const resetForm = () => {
        setVorname("");
        setNachname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
    };
    
    useEffect(() => {
        setIsRegister(initialIsRegister);
        setErrors({}); // Fehler zurücksetzen, wenn sich die Seite ändert
    }, [initialIsRegister]);
    useEffect(() => {
        if (user?.isAuthenticated) {
            setErrors({
                general: "Du bist bereits eingeloggt. Bitte melde dich ab, um einen anderen Account zu verwenden."
            });
        } else {
            setErrors({});
        }
    }, [user]);
    
    const handleAuth = async (e) => {
        e.preventDefault();
        setErrors({});
        if (user?.isAuthenticated) {
            setErrors({ general: "Du bist bereits eingeloggt. Bitte melde dich ab, um dich erneut anzumelden." });
            return;
        }
        if (!email || !password || (isRegister && (!vorname || !nachname))) {
            setErrors({ general: "Bitte fülle alle erforderlichen Felder aus." });
            return;
        }
    
        if (isRegister && password !== confirmPassword) {
            setErrors({ confirmPassword: "Passwörter stimmen nicht überein." });
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
                if (data.errors) {
                  // z. B. { email: "Ungültig", password: "Zu kurz" }
                  errorHandler(data);
                } else if (data.message) {
                  // z. B. "Diese E-Mail-Adresse wird bereits verwendet."
                  setErrors({ general: data.message });
                } else {
                  setErrors({ general: "Unbekannter Fehler. Bitte erneut versuchen." });
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
            setErrors({ general: "Serverfehler, bitte später erneut versuchen." });
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const userInfo = jwtDecode(response.credential); // JWT Token dekodieren
            console.log("Google User Info:", userInfo);

            const res = await fetch("http://localhost:3000/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ token: response.credential }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("✅ Google Login erfolgreich:", data);
            } else {
                console.error(" Fehler bei Google Auth:", data.message);
            }
        } catch (error) {
            console.error(" Fehler beim Google Login:", error);
        }
    };

    const handleGoogleFailure = () => {
        console.error(" Google Anmeldung fehlgeschlagen");
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
    <div>
       {/* <Navbar />   */}
        <NavbarMini />
        <div className="h-screen w-screen flex -mt-20">
            {/* Linke Seite: Bild */}
            <div className="hidden lg:block w-1/2 h-full">
                <img src={loginImage} alt="Login Illustration"
                     className="w-full h-full  object-cover object-[center] md:object-[25%_50%]"/>
            </div>

            {/* Rechte Seite: Formular */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center bg-white px-16">
                <div className="w-full max-w-[500px]">
                    <h1 className="text-4xl font-semibold text-[#0e5756] text-center mb-16" 
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
                                {errors.vorname && <p className="text-[#9C785E] text-sm">{errors.vorname}</p>}
                                <div className="relative flex items-center border-b border-gray-400">
                                    <BiUser className="absolute left-2 text-gray-500" size={20} />
                                    <input type="text" placeholder="Nachname" value={nachname} onChange={(e) => setNachname(e.target.value)}
                                        className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                                </div>
                                {errors.nachname && <p className="text-[#9C785E] text-sm">{errors.nachname}</p>}
                            </>
                        )}

                        <div className="relative flex items-center border-b border-gray-400">
                            <BiEnvelope className="absolute left-2 text-gray-500" size={20} />
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                        </div>
                        {errors.email && <p className="text-[#9C785E] text-sm">{errors.email}</p>}

                        <div className="relative flex items-center border-b border-gray-400">
                            <BiLock className="absolute left-2 text-gray-500" size={20} />
                            <input type={showPassword ? "text" : "password"} placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full text-gray-600 pl-8 py-3 bg-transparent focus:outline-none" />
                            <button type="button" className="absolute right-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-[#9C785E] text-sm">{errors.password}</p>}                
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
                           {errors.confirmPassword && (
                           <p className="text-[#9C785E] text-sm">{errors.confirmPassword}</p>
                        )}
                         {errors.general && <p className="text-[#9C785E] text-sm">{errors.general}</p>}

                        <button type="submit"
                            className="bg-[#116769] text-white py-2.5 px-6 mt-8 rounded-full hover:bg-[#0e5756] transition shadow-md">
                            {isRegister ? "Registrieren" : "Einloggen"}
                        </button>
                    </form>

                    <div className="text-center mt-10">
                    <button  onClick={() => {
                        resetForm();
                        navigate(`/auth?register=${!isRegister}`);
                         }}
                            className="text-[#0e5756] font-medium hover:text-[#116769] transition">
                            {isRegister ? (
                                <>Bereits ein Konto? <span className="font-bold underline">Hier einloggen</span></>
                            ) : (
                                <>Noch kein Konto? <span className="font-bold underline">Hier registrieren</span></>
                            )}
                        </button>
                    </div>

                    {!isRegister && (
 <div className="text-center mt-6">
 <a
     href="http://localhost:3000/api/auth/google?prompt=select_account"
     className="inline-flex items-center justify-center space-x-4 px-6 py-2 border border-gray-300 rounded-full hover:shadow-lg transition-all duration-200 bg-white hover:bg-gray-100"
 >
     <img
         src="https://developers.google.com/identity/images/g-logo.png"
         alt="Google Logo"
         className="w-5 h-5"
     />
     <span className="text-[#116769] font-medium">Mit Google anmelden</span>
 </a>
</div>

)}


                </div>
            </div>
        </div>
    </div>
);
};

export default AuthPage;