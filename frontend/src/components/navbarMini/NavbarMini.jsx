import React from "react";
import NavbarToggler from "../navbar/NavbarToggler";
import NavbarLinks from "../navbar/NavbarLinks";
import LogoMini from "./LogoMini"; // Logo réduit
import ProfileButton from "../navbar/ProfileButton";

const MiniNavbar = () => {
  return (
    <header className="top-0 left-0 z-50 w-full h-35 p-2 shadow-md bg-white opacity-95">
      <nav className="max-w-[90%] mx-auto flex justify-between items-center">
        {/* Logo Mini */}
        <LogoMini />

        {/* Liens du menu */}
        <NavbarLinks />

        {/* Profil & Hamburger */}
        <div className="flex items-center space-x-2">
          <ProfileButton />
          <NavbarToggler />
        </div>
      </nav>
    </header>
  );
};

export default MiniNavbar;
