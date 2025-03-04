import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const BuchungDetails = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Meine Buchungen</h3>
            {user?.buchungen?.length > 0 ? (
                <ul className="list-disc pl-6">
                    {user.buchungen.map((buchung, index) => (
                        <li key={index} className="py-2 border-b">
                            {buchung}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Keine Buchungen vorhanden.</p>
            )}
        </div>
    );
};

export default BuchungDetails;
