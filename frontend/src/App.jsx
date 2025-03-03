import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <AuthProvider> {/* AuthProvider zuerst */}
            <Router> {/* Router kommt danach */}
                <Header />
                <div className="container mx-auto p-6">
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
