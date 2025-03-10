
import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AccountDetails from "../components/AccountDetails";
import BookingDetails from "../components/BookingDetails";

const AccountBookingInfoPage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get("view"); // Holt "view=account" oder "view=buchung"

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return (
        <div>
            {view === "buchung" ? <BookingDetails /> : <AccountDetails />}
        </div>
    );
};

export default AccountBookingInfoPage;
