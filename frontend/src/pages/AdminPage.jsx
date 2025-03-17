// AdminPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export function AdminPage() {
  const [activeComponent, setActiveComponent] = useState("list"); // 默认加载订单列表
  const Navbar = () => {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li className="cursor-pointer hover:text-[#FAE1A8]">
            <Link to="bookings-query">Buchungsanfrage</Link>
          </li>
          <li className="cursor-pointer hover:text-[#FAE1A8]">
            <Link to="bookings-manage">Buchungsverwaltung</Link>
          </li>
          <li className="cursor-pointer hover:text-[#FAE1A8]">
            <Link to="reviews">Reviews</Link>
          </li>

          {/* <li>
                <Link to="/admin">Admin</Link>
              </li> */}
        </ul>
      </nav>
    );
  };
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
}

// export default AdminPage;
