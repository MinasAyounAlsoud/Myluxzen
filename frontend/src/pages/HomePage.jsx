import React, { useState, useEffect } from "react";
import Hero from "../components/hero/Hero"; // 🔥 Assure-toi du bon chemin du fichier Hero.jsx
//import Navbar from "../components/navbar/Navbar";
import NavbarMini from "../components/navbarMini/NavbarMini";
import Footer from "../components/footer/Footer";
import "../styles/extra.css";

const HomePage = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Récupère dynamiquement la hauteur de la navbar
    const navbar = document.querySelector("header");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
    
    // Met à jour la hauteur si la fenêtre est redimensionnée
    const handleResize = () => {
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

{/*<Navbar />*/}
      {/* Navbar fixée en haut */}
        <NavbarMini /> 
     


      {/* Section Hero avec un padding-top égal à la hauteur de la Navbar */}
      <main className="flex-grow" style={{ paddingTop: navbarHeight }}>
        <Hero />
      </main>

      {/* Footer toujours collé en bas */}
      <Footer />
    </div>
  );
};

export default HomePage;

