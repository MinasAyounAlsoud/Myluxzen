import { useContext,useEffect } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function AdminPage() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  //  Warte, bis die Benutzer-Session geladen ist
  if (loading) {
    return (
      <div className="text-center p-10 text-xl">
        Admin-Bereich wird geladen...
      </div>
    );
  }

  //  Schütze die Admin-Route
  if (!loading &(!user || !user.isAuthenticated || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }


  const Navbar = () => {
      const getLinkClass = ({ isActive }) =>
      isActive
        ? "text-[#FAE1A8] underline underline-offset-4"
        : "hover:text-[#FAE1A8]";

    return (
      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <ul className="flex space-x-4">
          <li className="cursor-pointer">
            <NavLink to="bookings-manage" className={getLinkClass}>
              BuchungsVerhandlung
            </NavLink>
          </li>
          {/* Xiangyu */}
          <li className="cursor-pointer">
            <NavLink to="booking-timeline" className={getLinkClass}>
            Reservierungszeitlinie
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="singleHouse-query" className={getLinkClass}>
            Häuseranfrage
            </NavLink>
          </li>
          {/*Zahra*/}
          <li className="cursor-pointer">
            <NavLink to="gallery" className={getLinkClass}>
              Galerie
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-[#FAE1A8]">
            <NavLink to="HausBeschreibung">HausBeschreibung</NavLink>
          </li>
          <li className="cursor-pointer hover:text-[#FAE1A8]">
            <NavLink to="reviews">Reviews</NavLink>
          </li>
          </ul>
            <button
             onClick={() => {
             logout();  // ✅ Logout nur aufrufen
             navigate("/auth?register=false");
             setMenuOpen(false);
              }}
              className="ml-auto bg-white text-black font-semibold py-1 px-3 rounded hover:bg-gray-200 transition-colors"
            >
            Abmelden
            </button>
     
      </nav>
    );
  };

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

