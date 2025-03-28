import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import "../../styles/extra.css";

const Footer = () => {
  return (
    <footer className="bg-teal-dark text-off-white py-12 relative overflow-hidden animate-fade-in">
      {/*  Effet lumineux subtil en arrière-plan */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(10,31,28,0.8)_100%)]"></div>

      <div className="relative z-10 max-w-[90%] md:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
        {/*  Colonne 1 : À propos */}
        <div className="group">
          <h3 className="text-xl font-semibold mb-4 text-sand transition duration-300 group-hover:scale-105">
            Über MyLuXZeN
          </h3>
          <p className="text-off-white text-sm leading-relaxed opacity-80 hover:opacity-100 transition duration-300">
            MyLuxZen ist eine exklusive Plattform für die Buchung von
            Luxusferienwohnungen. Genießen Sie einen luxuriösen Aufenthalt an
            den schönsten Reisezielen.
          </p>
        </div>

        {/*  Colonne 2 : Liens rapides */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-caramel">
            Schnellzugriff
          </h3>
          <ul className="text-off-white space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Galerie", path: "/gallerie" },
              { name: "Unsere Villen", path: "/HausBeschreibung" },
              { name: "Über uns", path: "/about" },
              { name: "Reviews", path: "/reviews" },
              { name: "AGB", path: "/agb" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="hover:text-caramel transition duration-300 ease-in-out transform hover:scale-105 inline-block relative group underline-sand"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-caramel transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*  Colonne 3 : Contact & Réseaux sociaux */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-caramel">Kontakt</h3>
          <p className="text-off-white text-sm mb-1">
            E-Mail: kontakt@myluxzen.com
          </p>
          <p className="text-off-white text-sm mb-4">
            Telefon: +49 123 456 789
          </p>

          <h3 className="text-xl font-semibold mb-4 text-caramel">
            Folgen Sie uns
          </h3>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-off-white transition duration-300 ease-in-out transform hover:scale-110 hover:text-caramel shadow-lg shadow-caramel/30 p-3 rounded-full bg-caramel hover:bg-[#1c3b36] animate-bounce-on-hover"
                >
                  <Icon className="text-xl" />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* 📌 Barre en bas */}
      <div className="border-t border-caramel mt-10 pt-4 text-center text-gray-400 text-sm relative z-10">
        © {new Date().getFullYear()} MyLuXZeN - Alle Rechte vorbehalten.
      </div>
    </footer>
  );
};

export default Footer;
