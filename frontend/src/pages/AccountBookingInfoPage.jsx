
import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AccountDetails from "../components/User/AccountDetails";
import BookingDetails from "../components/User/BookingDetails";
import { Link } from "react-router-dom";
import LoginRegestrieren from "../components/User/LoginRegestrieren"; 

const AccountBookingInfoPage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get("view"); // Holt "view=account" oder "view=buchung"
    if (!user) {
        return <Navigate to="/" />;
    }
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
            <Header/>
            {view === "booking" ? <BookingDetails /> : <AccountDetails />}
        </div>
    );
};

export default AccountBookingInfoPage;
