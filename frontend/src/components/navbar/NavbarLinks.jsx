/*import { Link } from "react-scroll";

const links = [
  { link: "About Me", section: "about" },
  { link: "Skills", section: "skills" },
  { link: "Experience", section: "experience" },
  { link: "Projects", section: "projects" },
  { link: "Contact", section: "contact" },
];

const NavbarLinks = () => {
  return (
    <ul className="flex lg:flex-row sm:flex-col gap-6 text-white font-body lg:relative sm:absolute sm:top-[120%] text-center left-[50%] -translate-x-[50%] lg:text-md sm:text-xl sm:bg-cyan/30 backdrop-blur-lg lg:bg-black sm:w-full py-4">
      {links.map((link, index) => {
        return (
          <li key={index} className="group">
            <Link
              spy={true}
              smooth={true}
              duration={500}
              offset={-130}
              to={link.section}
              className="cursor-pointer text-white hover:text-cyan transition-all duration-500"
            >
              {link.link}
            </Link>
            <div className="mx-auto bg-cyan w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
          </li>
        );
      })}
    </ul>
  );
};

export default NavbarLinks;*/
//NavbarLinks
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { NavLink } from "react-router-dom";


// Définir les liens du menu avec leur type
const links = [
  { link: "Home", path: "/", type: "router" }, // Page
  { link: "Gallerie", path: "/gallerie", type: "router" }, // ✅ Correction: "/gallery" → "/gallerie"
  { link: "Villen", section: "villen", type: "scroll" }, // Scroll
  { link: "Aktivitäten", section: "aktivitaeten", type: "scroll" }, // Scroll
  { link: "About Us", path: "/about", type: "router" }, // Page
  { link: "AGB", section: "agb", type: "scroll" } // Scroll
];


const NavbarLinks = ({ isMenuOpen }) => {
  const [fontSize, setFontSize] = useState("20px");

  useEffect(() => {
    const adjustFontSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1280) {
        setFontSize("12px");
      } else if (screenWidth < 1400) {
        setFontSize("15px");
      } else {
        setFontSize("20px");
      }
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, []);

  return (
    <ul
      className={`${
        isMenuOpen
          ? "flex flex-col items-center absolute top-full left-0 right-0 bg-white p-4 gap-4 sm:bg-cyan/30 backdrop-blur-lg z-10 w-full"
          : "hidden"
      } lg:flex lg:flex-row lg:gap-8 lg:bg-transparent lg:text-white font-body sm:w-full py-4 sm:text-xl lg:text-base text-center justify-center mx-auto`}
    >
      {links.map((link, index) => (
        <li key={index} className="group navbar-link" style={{ fontSize }}>
          {link.type === "scroll" ? (
            <ScrollLink
              to={link.section}
              spy={true}
              smooth={true}
              duration={500}
              offset={-130}
              className="cursor-pointer hover:text-cyan transition-all duration-500"
            >
              {link.link}
            </ScrollLink>
          ) : (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-500 ${
                  isActive ? "text-cyan font-bold" : "hover:text-cyan"
                }`
              }
            >
              {link.link}
            </NavLink>
          )}
          <div className="mx-auto w-0 group-hover:w-full h-[1px] transition-all duration-500"></div>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;



