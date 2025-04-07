import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import aboutUs from "../dataJson/aboutUnsData.json";
import NavbarMini from "../components/navbarMini/NavbarMini";
import "../styles/extra.css";
import aboutUsImgMinas from "../assets/aboutUsImg/Minas1.jpg";
import aboutUsImgNaheeda from "../assets/aboutUsImg/Naheeda1.jpg";
import aboutUsImgXiangyu from "../assets/aboutUsImg/Xiangyu.jpg";
import aboutUsImgFatima from "../assets/aboutUsImg/Fatima.jpg";

import teamBg from "../assets/aboutUsImg/kayak1.avif";
import Footer from "../components/footer/Footer";
import { FaArrowLeft, FaArrowUp, FaEnvelope, FaPhone } from "react-icons/fa";

const InfoSection = ({ title, description, image }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-20">
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-90"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: "fixed",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-4xl bg-white/90 backdrop-blur-lg p-12 md:p-16 rounded-3xl text-center shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            delay: 0.3,
          }}
          className="text-4xl font-bold text-teal-700 mb-6"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            delay: 0.5,
          }}
          className="text-lg text-gray-800 leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

const UnserTeamSection = () => {
  const teamMembers = [
    {
      name: "Fatima Zahra Azekraoui",
      image: aboutUsImgFatima,
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
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen py-20 px-6 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${teamBg})` }}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
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
    </motion.div>
  );
};

const AboutUsPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <div className="w-full">
      <NavbarMini />
      <UnserTeamSection />

      {/* <MainSection /> */}
      {aboutUs.map((ab, idx) => (
        <InfoSection
          key={idx}
          title={ab.title}
          description={ab.description}
          image={ab.image}
        />
      ))}

      <Footer />
    </div>
  );
};

export default AboutUsPage;
