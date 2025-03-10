import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = ()=>{
    const Navbar = () => {
        return (
          <nav className="bg-gray-800 text-white p-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </nav>
        );
    }
    return(
        <div>
            <Navbar></Navbar>
            <p>Homepage</p>
        </div>
    );
}