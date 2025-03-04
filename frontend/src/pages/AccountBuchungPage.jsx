
import { useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import AccountDetails from "../components/AccountDetails";
import BuchungDetails from "../components/BuchungDetails";

const AccountBuchungPage = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const view = queryParams.get("view"); // Holt "view=account" oder "view=buchung"

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return (
        <div>
            {view === "buchung" ? <BuchungDetails /> : <AccountDetails />}
        </div>
    );
};

export default AccountBuchungPage;
