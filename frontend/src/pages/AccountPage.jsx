import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AccountDetails from "../components/AccountDetails";

const AccountPage = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/auth?register=false" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <AccountDetails />
        </div>
    );
};

export default AccountPage;
