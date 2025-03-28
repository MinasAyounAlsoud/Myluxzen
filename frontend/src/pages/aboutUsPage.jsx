import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import aboutUs from "../dataJson/aboutUnsData.json";
import mainBild from "../assets/aboutUsImg/main2.avif";
import NavbarMini from "../components/navbarMini/NavbarMini";
import "../styles/extra.css";
import aboutUsImgMinas from "../assets/aboutUsImg/minas.jpg";
import aboutUsImgNaheeda from "../assets/aboutUsImg/Naheeda.jpg";
import aboutUsImgXiangyu from "../assets/aboutUsImg/Xiangyu.jpg";
import teamBg from "../assets/aboutUsImg/kayak1.avif";
import Footer from "../components/footer/Footer";
import { FaArrowLeft, FaArrowUp, FaEnvelope, FaPhone } from "react-icons/fa";

const MainSection = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white px-6"
      style={{ backgroundImage: `url(${mainBild})` }}
    >
      <div className="text-center bg-black/10 p-8 rounded-xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-12 "
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Willkommen bei Myluxzen
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl max-w-3xl"
          style={{ fontFamily: "Merriweather, serif" }}
        >
          Erlebe unvergleichlichen Luxus und unvergessliche Momente – erschaffen
          für dich!
        </motion.p>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-white text-3xl opacity-80"
      >
        <FaChevronDown />
      </motion.div>
    </div>
  );
};

const InfoSection = ({ title, description, image }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10 h-1/2 w-full flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl px-8 text-center"
        >
          <h2
            className="text-4xl font-bold text-teal-dark mb-12"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            {title}
          </h2>
          <p
            className="text-lg text-gray-600 leading-relaxed"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            {description}
          </p>
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

const UnserTeamSection = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const teamMembers = [
    {
      name: "Fatima Zahra Azekraoui",
      image: "",
      description:
        "Fatima ist die Gründerin von Myluxzen, die mit viel Leidenschaft und Vision das Hotel erschaffen hat. Ihr Ziel ist es, Gästen unvergessliche Erlebnisse in einem luxuriösen und entspannten Ambiente zu bieten.",
    },
    {
      name: "Minas Ayoun Alsoud",
      image: aboutUsImgMinas,
      description:
        "Minas ist Mitbegründerin von Myluxzen und sorgt dafür, dass jeder Aufenthalt der Gäste ein perfektes Erlebnis wird. Ihr Augenmerk liegt auf exzellentem Service und einem hohen Standard in jeder Hinsicht.",
    },
    {
      name: "Naheeda Tokhi",
      image: aboutUsImgNaheeda,
      description:
        "Naheeda ist Mitgründerin und die kreative Seele von Myluxzen. Sie sorgt dafür, dass jede Unterkunft einladend und einzigartig gestaltet ist, um den Gästen ein Gefühl von Luxus und Komfort zu vermitteln.",
    },
    {
      name: "Xiangyu Liu",
      image: aboutUsImgXiangyu,
      description:
        "Xiangyu ist Mitgründerin und die organisatorische Stütze von Myluxzen. Sie sorgt dafür, dass alle Prozesse reibungslos ablaufen und jeder Gast die bestmögliche Erfahrung während seines Aufenthalts hat.",
    },
  ];

  return (
    <div
      className="min-h-screen py-16 px-6 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${teamBg})` }}
    >
      <div className="min-h-screen py-16 px-6 bg-cover bg-center text-white">
        <div className="max-w-7xl mx-auto text-center mb-15">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold text-teal-dark mb-12"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Unser Team
          </motion.h1>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full md:w-1/2 lg:w-1/4 xl:w-1/5"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <div className="relative z-10 p-4 text-center">
                <h2 className="text-2xl font-semibold text-white">
                  {member.name}
                </h2>
                <p className="text-lg text-white mt-5">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="mt-10 bg-teal-dark  text-[#fae1a8] py-3 px-6 rounded-lg flex items-center gap-2 text-sm mx-auto"
      >
        <FaArrowUp /> Nach oben scrollen
      </button>
    </div>
  );
};

const aboutUsPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <div className="w-full">
      <NavbarMini />
      <MainSection />
      {aboutUs.map((ab, idx) => (
        <InfoSection
          key={idx}
          title={ab.title}
          description={ab.description}
          image={ab.image}
        />
      ))}
      <UnserTeamSection />
      <Footer />
    </div>
  );
};

export default aboutUsPage;
