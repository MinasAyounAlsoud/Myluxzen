import { NavLink, Outlet } from 'react-router-dom';

export function AdminPage() {
  const Navbar = () => {
    const getLinkClass = ({ isActive }) =>
      isActive
        ? 'text-[#FAE1A8] underline underline-offset-4'
        : 'hover:text-[#FAE1A8]';

    return (
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li className="cursor-pointer">
            <NavLink to="bookings-manage" className={getLinkClass}>
              BuchungsVerhandlung
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
          {/*Zahra*/ }
          <li className="cursor-pointer">
            <NavLink to="gallery" className={getLinkClass}>
              Galerie
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