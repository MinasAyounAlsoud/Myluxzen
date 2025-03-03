
// src/components/Dashboard.jsx (Benutzer-Dashboard & responsiv)
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Willkommen, {user?.name}!</h2>
                <p className="text-gray-600 text-center">Hier findest du deine Buchungen und Zahlungsübersicht.</p>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Buchungshistorie</h3>
                        <p className="text-gray-600">Siehe deine vergangenen und aktuellen Buchungen.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Zahlungen</h3>
                        <p className="text-gray-600">Verwalte deine Rechnungen und Zahlungsdetails.</p>
                    </div>
                </div>
                
                <button onClick={logout} className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
