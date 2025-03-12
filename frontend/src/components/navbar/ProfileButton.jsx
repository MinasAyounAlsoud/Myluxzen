import React, { useState } from 'react';
import { FaUserCircle, FaTachometerAlt, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bouton Profil (même taille, icône toujours visible) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="button button-secondary flex items-center justify-center w-15 h-15 md:w-44 md:h-12 
                   rounded-full md:rounded-4xl transition-all px-1 "
      >
        <FaUserCircle size={28} className="text-current" /> {/* Garde la couleur du texte */}
        <span className="hidden md:inline ml-2">Login</span> {/* Texte caché sur mobile */}
      </button>

      {/* Menu déroulant sous le bouton */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-48 bg-white p-4 shadow-lg mt-2 rounded-md">
          <ul>
            <li className="py-2 px-4 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </li>
            <li className="py-2 px-4 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FaUserPlus />
              <span>Regestrieren</span>
            </li>
            <li className="py-2 px-4 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FaSignInAlt />
              <span>Login</span>
            </li>
            <li className="py-2 px-4 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;





/*import { Link } from "react-scroll";
import { LuArrowDownRight } from "react-icons/lu";

const NavbarBtn = () => {
  return (
    <button className=" px-4 py-2 rounded-full text-xl font-bold font-body text-white border-cyan border flex items-center gap-1 bg-gradient-to-r  from-darkCyan to-orange transition-all duration-500 hover:scale-110 hover:border-orange cursor-pointer hover:shadow-cyanShadow">
      <Link spy={true} smooth={true} duration={500} offset={-120} to="contact">
        Hire Me
      </Link>
      <div className="sm:hidden md:block">
        <LuArrowDownRight />
      </div>
    </button>
  );
};

export default NavbarBtn;*/