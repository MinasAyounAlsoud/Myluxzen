/*import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export function AdminPage() {
    const Navbar = () => {
        return (
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li className='cursor-pointer hover:text-[#FAE1A8]'>
                  <NavLink to="bookings-manage">BuchungsVerhandlung</NavLink>
              </li>
              <li className='cursor-pointer hover:text-[#FAE1A8]'>
                <NavLink to="singleHouse-query">Häuseranfrage</NavLink>  
              </li>    
              <li className='cursor-pointer hover:text-[#FAE1A8]'>
                <NavLink to="booking-edit">Buchungsticket bearbeiten</NavLink>  
              </li>         
            </ul>
          </nav>
        );
    }
    return (
        <div className=''>
          <Navbar></Navbar>
          <Outlet /> 
        </div>
    );
}

*/

import { NavLink ,Navigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
export function AdminPage() {
    const Navbar = () => {
      const { user} = useContext(AuthContext);
      if (!user || !user.isAuthenticated || !user.isAdmin) {
        return <Navigate to="/" replace />;
      }
  
        return (
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li className='cursor-pointer hover:text-[#FAE1A8]'>
                  <NavLink to="bookings-query">Buchungsanfrage</NavLink>
                </li>
              <li className='cursor-pointer hover:text-[#FAE1A8]'>
                  <NavLink to="bookings-manage">Buchungsverwaltung</NavLink>  
              </li>
            </ul>
          </nav>
        );
    }  
    return (
        <div className=''>
          <Navbar></Navbar>
          <Outlet /> 
        </div>
    );
}
