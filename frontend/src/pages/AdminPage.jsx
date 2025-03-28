import { useContext,useEffect } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function AdminPage() {

  const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    if (!user || !user.isAuthenticated || !user.isAdmin) {
      return <Navigate to="/" replace />;
    }
      const getLinkClass = ({ isActive }) =>
      isActive
        ? "text-[#FAE1A8] underline underline-offset-4"
        : "hover:text-[#FAE1A8]";

    return (
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-6 flex-wrap">
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
          {/* <li className="cursor-pointer">
            <NavLink to="booking-edit" className={getLinkClass}>
              Buchungsticket bearbeiten
            </NavLink>
          </li> */}
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
           {/*Zahra*/ }
          <li className="cursor-pointer">
  <NavLink to="booking-dashboard" className={getLinkClass}>
    Dashboard Buchungen
  </NavLink>
</li>
{/*Zahra*/ }
<li className="cursor-pointer">
  <NavLink to="client-email-support" className={getLinkClass}>
    E-Mail Support
  </NavLink>
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
/*import { NavLink, Outlet } from "react-router-dom";

export function AdminPage() {
  const Navbar = () => {
    const getLinkClass = ({ isActive }) =>
      isActive
        ? "text-caramel border-b-2 border-caramel"
        : "text-off-white hover:text-caramel";

    return (
      <nav className="bg-teal-dark text-off-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-tan-angleton text-peach tracking-wider">
            Admin Panel
          </h1>

          <ul className="flex flex-wrap gap-6 text-sm font-haute-couture uppercase tracking-wide">
            <li>
              <NavLink to="bookings-manage" className={getLinkClass}>
                BuchungsVerhandlung
              </NavLink>
            </li>
            <li>
              <NavLink to="singleHouse-query" className={getLinkClass}>
                Häuseranfrage
              </NavLink>
            </li>
            <li>
              <NavLink to="booking-edit" className={getLinkClass}>
                Buchungsticket bearbeiten
              </NavLink>
            </li>
            <li>
              <NavLink to="gallery" className={getLinkClass}>
                Galerie
              </NavLink>
            </li>
            <li>
              <NavLink to="booking-dashboard" className={getLinkClass}>
                Dashboard Buchungen
              </NavLink>
            </li>
            <li>
              <NavLink to="client-email-support" className={getLinkClass}>
                E-Mail Support
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
*/ 
/*import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-caramel border-b-2 border-caramel"
      : "text-off-white hover:text-caramel";

  const navItems = [
    { to: "bookings-manage", label: "BuchungsVerhandlung" },
    { to: "singleHouse-query", label: "Häuseranfrage" },
    { to: "booking-edit", label: "Buchungsticket bearbeiten" },
    { to: "gallery", label: "Galerie" },
    { to: "booking-dashboard", label: "Dashboard Buchungen" },
    { to: "client-email-support", label: "E-Mail Support" },
  ];

  const Navbar = () => (
    <nav className="bg-teal-dark text-off-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-tan-angleton text-peach">Admin Panel</h1>

      
        <ul className="hidden md:flex gap-6 text-sm font-haute-couture uppercase tracking-wide">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={getLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>


        <button
          className="md:hidden text-off-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 font-haute-couture uppercase tracking-wide text-sm px-2 animate-fadeIn">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={getLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}*/
