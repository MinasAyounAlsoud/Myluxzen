import { useContext,useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function AdminPage() {

  // useEffect(() => {
  //   if (user === null || !user.isAuthenticated || !user.isAdmin) {
  //     navigate('/');
  //   }
  // }, [user]);

  const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    if (user === null || !user.isAuthenticated || !user.isAdmin) {
      navigate('/');
    }
    const getLinkClass = ({ isActive }) =>
      isActive
        ? "text-[#FAE1A8] underline underline-offset-4"
        : "hover:text-[#FAE1A8]";

    return (
      <nav className="bg-gray-800 text-white p-4">
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
          <li className="cursor-pointer">
            <NavLink to="booking-edit" className={getLinkClass}>
              Buchungsticket bearbeiten
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
