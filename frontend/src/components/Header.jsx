import { Link } from "react-router-dom";
import LoginRegestrieren from "./LoginRegestrieren"; // Neue UserProfile-Komponente

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

export default Header;
