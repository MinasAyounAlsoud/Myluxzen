// src/pages/HomePage.jsx (Begrüßungsseite)
/*import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Willkommen auf unserer Plattform</h1>
                <p className="text-gray-600 mb-6">Bitte melde dich an, um dein Dashboard zu sehen.</p>
                <Link to="/auth" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                    Login / Registrieren
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

*/


// src/pages/HomePage.jsx (Willkommensseite mit verbessertem Styling)
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
    
            <div className="w-full max-w-3xl bg-white p-10 rounded-lg items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Willkommen auf My Dashboard</h1>
                <p className="text-lg text-gray-600 mb-6">Verwalte deine Buchungen und persönlichen Daten ganz einfach.</p>
            </div>
    );
};

export default HomePage;
