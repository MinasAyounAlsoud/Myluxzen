
import React from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import activities from "../dataJson/activitiesData.json"; // Pfad anpassen
import mainBild from "../assets/imageNaheeda/main5.jpg"
// import mainBild from "../assets/imageNaheeda/main2.avif"
import contactImage from "../assets/imageNaheeda/rezeption4.jpg"; // dein Kontaktbild
import { FaArrowLeft, FaArrowUp, FaEnvelope, FaPhone } from "react-icons/fa";
import NavbarMini from "../components/navbarMini/NavbarMini";
import "../styles/extra.css";


const MainSection = () => {
  return (
    <div className="relative h-[86vh] w-full overflow-hidden">
      {/* Hintergrundbild */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${mainBild})`,
          backgroundAttachment: "fixed",
        }}
      />

      {/* Text im Vordergrund */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-12" style={{ fontFamily: 'Merriweather, serif' }}
        >
          Entdecke unsere exklusiven Aktivitäten
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl max-w-3xl" style={{ fontFamily: 'Merriweather, serif' }}
        >
          Von luxuriösen Spa-Erlebnissen bis zu aufregenden Abenteuern –
          gestalte deinen perfekten Aufenthalt.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-white text-3xl opacity-80"
        >
          <FaChevronDown />
        </motion.div>
      </div>
    </div>
  );
};


const ActivitySection = ({ title, description, image }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, backgroundAttachment: "fixed" }}
      />
     <div className="relative z-10 h-1/2 w-full flex items-center justify-center bg-white/70 backdrop-blur-sm">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="max-w-4xl px-8 text-center"
  >
    <h2 className="text-4xl font-bold text-teal-dark mb-12" style={{ fontFamily: 'Merriweather, serif' }}>{title}</h2>
    <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Merriweather, serif' }}>{description}</p>
  </motion.div>
</div>

      <div className="relative z-0 h-1/2 w-full" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white text-3xl opacity-70"
        >
          ↓
        </motion.div>
      </div>
    </div>
  );
};

// Kontaktbereich am Ende
const ContactSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#116769] text-white py-12 px-4 md:px-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mt-8 mb-14">
        {/* Textbereich */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-light text-sand">Sie haben Fragen?</h2>
          <p className="text-off-white md:text-lg">
            Wir beantworten Sie gern unter:{" "}
            <span className="inline-flex items-center gap-2">
              <FaPhone className="ml-3  text-caramel" />  +49 123 456 789
            </span>
          </p>
          <p className="text-base md:text-lg text-off-white">
            oder per Email an:{" "}
            <span className="inline-flex items-center gap-2">
              <FaEnvelope className="ml-6 text-caramel" />
              <a
                href="mailto:kontakt@myluxzen.com"
                className=" text-off-whit hover:text-caramel transition duration-300 ease-in-out transform hover:scale-105 inline-block relative group"
              >
                kontakt@myluxzen.com
              </a>
            </span>
          </p>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 flex-wrap">
            <button className="bg-caramel hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center gap-2 text-sm"
            onClick={() => window.location.href = "/booking"}>

              <FaArrowLeft /> Unterkunft buchen
            </button>
            <button
              onClick={scrollToTop}
              className="bg-caramel hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center gap-2 text-sm ml-7"
            >
              <FaArrowUp /> nach oben scrollen
            </button>
          </div>
        </div>

        {/* Bild */}
        <div className="flex-1 hidden md:block">
          <img
            src={contactImage}
            alt="Kontakt"
            className="w-full max-w-xs rounded-md shadow-xl mx-auto"
          />
        </div>
      </div>

      {/* Linie + Copyright */}
      <div className="w-full border-t border-gray-400 mt-6 pt-3 text-center text-sm text-gray-300">
         © {new Date().getFullYear()} MyLuXZeN – Alle Rechte vorbehalten.
      </div>
    </div>
  );
};

const ActivitiesPage = () => {
  return (
    <div className="w-full">
       <NavbarMini />
       <MainSection />
      {activities.map((act, idx) => (
        <ActivitySection
          key={idx}
          title={act.title}
          description={act.description}
          image={act.image}
        />
      ))}
      <ContactSection />
    </div>
  );
};

export default ActivitiesPage;