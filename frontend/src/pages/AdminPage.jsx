import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
export function AdminPage() {
    const Navbar = () => {
        return (
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li className='cursor-pointer hover:text-[#FAE1A8]'>
                  <NavLink to="bookings-manage">Buchungsanfrage</NavLink>
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
