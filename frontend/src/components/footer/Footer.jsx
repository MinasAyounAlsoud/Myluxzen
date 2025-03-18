import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-dark  text-off-white py-10">
      <div className="max-w-[90%] md:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 📌 Colonne 1 : À propos */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-sand">Über MyLuxZen</h3>
          <p className="text-off-white text-sm">
            MyLuxZen ist eine exklusive Plattform für die Buchung von Luxusferienwohnungen.
            Genießen Sie einen luxuriösen Aufenthalt an den schönsten Reisezielen.
          </p>
        </div>

        {/* 📌 Colonne 2 : Liens rapides */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-caramel">Schnellzugriff</h3>
          <ul className="text-off-white space-y-2">
            <li>
              <Link to="/" className="hover:text-peach transition">Home</Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-peach transition">Buchen</Link>
            </li>
            <li>
              <Link to="/gallerie" className="hover:text-peach transition">Galerie</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-peach transition">Über uns</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-peach transition">Kontakt</Link>
            </li>
            <li>
              <Link to="/agb" className="hover:text-peach transition">AGB</Link>
            </li>
          </ul>
        </div>

        {/* 📌 Colonne 3 : Contact & Réseaux sociaux */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-caramel">Kontakt</h3>
          <p className="text-off-white text-sm">E-Mail: kontakt@myluxzen.com</p>
          <p className="text-off-white  text-sm mb-3">Telefon: +49 123 456 789</p>

          <h3 className="text-xl font-semibold mb-3 text-caramel">Folgen Sie uns</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-off-white transition text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-off-white transition text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-off-white transition text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-off-white transition text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      {/* 📌 Barre en bas */}
      <div className="border-t border-caramel mt-8 pt-4 text-center -off-white text-sm">
        © {new Date().getFullYear()} MyLuxZen - Alle Rechte vorbehalten.
      </div>
    </footer>
  );
};

export default Footer;

  