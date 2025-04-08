import { useEffect } from "react";
import { motion } from "framer-motion";
import faqData from "../dataJson/faqData.json";
import mainBild from "../assets/imageNaheeda/main5.jpg";
import NavbarMini from "../components/navbarMini/NavbarMini";
import "../styles/extra.css";
import {
  FaArrowLeft,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown,
} from "react-icons/fa";

// Bilder direkt importieren ✅
import massageImg from "../assets/imageNaheeda/massage3.jpg";
import yogaImg from "../assets/imageNaheeda/yoga4.avif";
import meerviewImg from "../assets/imageNaheeda/meerview2.jpeg";
import wandernImg from "../assets/imageNaheeda/wandern1.avif";
import horseImg from "../assets/imageNaheeda/horsriding3.jpg";
import motorradImg from "../assets/imageNaheeda/motorrad2.jpeg";
import boatImg from "../assets/imageNaheeda/boat3.jpeg";
import tauchenImg from "../assets/imageNaheeda/tauchen1.avif";
import kayakImg from "../assets/imageNaheeda/kayak1.avif";
import golfImg from "../assets/imageNaheeda/golf6.avif";
import heliImg from "../assets/imageNaheeda/helikopter.avif";
import restaurantImg from "../assets/imageNaheeda/restaurant3.jpg";
import weinImg from "../assets/imageNaheeda/wein3.jpg";

const activities = [
  {
      title: "Luxus-Spa & Massage",
      description: "Tauchen Sie ein in eine Oase der Ruhe. Unser luxuriöses Spa bietet eine exklusive Auswahl an Massagen, Aromatherapien und individuellen Behandlungen. Mit sanfter Musik, duftenden Ölen und professionellen Therapeuten wird jede Sitzung zu einer Reise der völligen Entspannung. Der Spa-Bereich verfügt über private Räume, Dampfbäder und ein elegantes Ambiente, das speziell für Regeneration und Wellness geschaffen wurde.",
      image: massageImg
    },
    {
      title: "Yoga & Meditation",
      description: "Beginnen Sie Ihren Tag mit sanften Yoga-Flows direkt am Meer. Unsere zertifizierten Lehrer begleiten Sie auf dem Weg zu innerer Balance und geistiger Klarheit. Ob Anfänger oder erfahrener Yogi – erleben Sie achtsame Meditationseinheiten, Atemtechniken und individuelle Yoga-Stunden inmitten der Natur.",
      image: yogaImg
    },
    {
      title: "Infinity-Pool mit Meerblick",
      description: "Unser spektakulärer Infinity-Pool verschmilzt mit dem Horizont. Entspannen Sie auf luxuriösen Liegen, genießen Sie den Cocktail-Service direkt am Pool oder schwimmen Sie eine Runde mit einem einzigartigen Panoramablick auf das offene Meer. Perfekt für Sonnenuntergänge oder eine kleine Erfrischung zwischendurch.",
      image: meerviewImg
    },
    {
      title: "Wanderungen & Naturtouren",
      description: "Erkunden Sie atemberaubende Landschaften mit unseren geführten Wanderungen. Entlang von Küstenpfaden, durch duftende Pinienwälder oder hinauf zu majestätischen Aussichtspunkten – unsere Touren bieten Erholung, Abenteuer und unvergessliche Naturerlebnisse für jedes Level.",
      image: wandernImg
    },
    {
      title: "Reiten am Strand",
      description: "Ein unvergesslicher Ritt bei Sonnenuntergang erwartet Sie. Ob am endlosen Sandstrand oder durch grüne Landschaften – unsere erfahrenen Reitführer begleiten Sie auf romantischen und abenteuerlichen Touren. Für Anfänger stehen Einführungskurse bereit, für Fortgeschrittene längere Ausflüge ins Hinterland.",
      image: horseImg
    },
    {
      title: "Fahrrad- & E-Bike-Touren",
      description:"Genießen Sie aktive Entdeckungstouren entlang der Küste oder durch historische Dörfer. Unsere hochwertigen E-Bikes und Fahrräder bringen Sie mühelos zu versteckten Plätzen. Ideal für sportliche Gäste oder entspannte Familienausflüge – auf Wunsch mit Guide.",
      image: motorradImg
    },
    {
      title: "Bootstouren & Yachting",
      description:"Gleiten Sie über das kristallklare Wasser in exklusiven Booten oder privaten Yachten. Entdecken Sie einsame Buchten, genießen Sie ein Glas Champagner an Bord oder lassen Sie sich auf einer Sunset Cruise verzaubern. Unsere Touren sind individuell buchbar – von romantisch bis luxuriös.",
      image: boatImg
    },
    {
      title: "Schnorcheln & Tauchen",
      description: "Begeben Sie sich in die faszinierende Unterwasserwelt. Unsere zertifizierten Tauchlehrer führen Sie zu den besten Spots, an denen Sie bunte Korallenriffe, exotische Fische und ruhige Lagunen entdecken können. Auch Schnorcheltouren für Familien sind möglich – inklusive Ausrüstung und Guide.",
      image: tauchenImg
    },
    {
      title: "Kajak & Stand-Up-Paddling",
      description: "Genießen Sie ruhige Stunden auf dem Wasser – im Einzel-Kajak oder auf dem Paddleboard. Ideal für Anfänger und erfahrene Paddler, bietet diese Aktivität einen einzigartigen Blick auf die Küste, Höhlen und verborgene Buchten. Gerne geben wir eine Einführung vor Ort.",
      image: kayakImg
    },
    {
      title: "Golf",
      description: "Zwei erstklassige 18-Loch-Plätze mit Blick aufs Meer bieten ideale Bedingungen für Anfänger und Pros. Spielen Sie inmitten gepflegter Greens, unter Palmen und mit erstklassiger Ausrüstung. Driving Range, Golfkurse und individuelles Coaching runden das Erlebnis ab.",
      image: golfImg
    },
    {
      title: "Helikopter & Privatjet-Erlebnisse",
      description:  "Einmalige Perspektiven erwarten Sie bei unseren Panorama-Flügen. Ob VIP-Transfer oder Rundflug über Küsten, Berge und Städte – genießen Sie höchste Exklusivität in der Luft. Auch private Jet-Charter stehen zur Verfügung.",
      image: heliImg
    },
    {
      title: "Regionale & nachhaltige Küche",
      description: "Unser Küchenchef verwöhnt Sie mit kulinarischen Highlights aus der Region. Frische, saisonale Zutaten, nachhaltige Konzepte und liebevolle Präsentation machen jedes Gericht zu einem Erlebnis. Vegan, vegetarisch oder traditionell – wir haben für jeden Geschmack etwas dabei.",
      image: restaurantImg
    },
    {
      title: "Weinverkostung & Bar",
      description:  "Lassen Sie den Tag stilvoll ausklingen – mit erlesenen Weinen aus aller Welt. Unsere Bar lädt mit gemütlichem Ambiente, Panorama-Blick und Signature-Cocktails zum Verweilen ein. Auch private Tastings mit Sommelier sind buchbar.",
      image: weinImg
    }
];

const MainSection = () => (
  <div className="relative h-[86vh] w-full overflow-hidden">
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${mainBild})`,
        backgroundAttachment: "fixed",
      }}
    />
    <div className="relative z-10 h-full w-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm text-white text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-bold mb-12"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Entdecke unsere exklusiven Aktivitäten
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl md:text-2xl max-w-3xl"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Von luxuriösen Spa-Erlebnissen bis zu aufregenden Abenteuern – gestalte
        deinen perfekten Aufenthalt.
      </motion.p>
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

const ActivitySection = ({ title, description, image }) => (
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
        <h2 className="text-4xl font-bold text-teal-dark mb-12" style={{ fontFamily: "Merriweather, serif" }}>{title}</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
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

const Accordion = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#d6cfc9] pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center py-4 font-semibold text-lg"
      >
        {question}
        <span className="text-2xl text-caramel">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="text-md text-gray-600 pl-2 pr-4 transition-all duration-300">
          {answer}
        </p>
      )}
    </div>
  );
};

const ContactSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#f9f4ef] text-teal-dark py-16 px-6 md:px-12">
      <h2
        className="text-3xl font-bold mb-8 text-center"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Fragen & Antworten
      </h2>
      <div className="max-w-4xl mx-auto space-y-4 mb-16">
        {faqData.map((faq, idx) => (
          <Accordion key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="mt-16 text-center text-teal-dark">
        <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "Merriweather, serif" }}>
          Noch Fragen zu unseren Aktivitäten?
        </h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 group">
            <FaEnvelope className="text-caramel text-base" />
            <span className="font-semibold relative group-hover:underline group-hover:underline-offset-4">
              kontakt@myluxzen.com
            </span>
          </div>
          <span className="hidden sm:inline text-gray-400">|</span>
          <div className="flex items-center gap-2 group">
            <FaPhoneAlt className="text-caramel text-base" />
            <span className="font-semibold relative group-hover:underline group-hover:underline-offset-4">
              +49 123 456 789
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button className="bg-caramel hover:bg-[#0e5756] text-white py-2 px-4 rounded flex items-center gap-2 text-sm ">
          <FaArrowLeft /> Aktivitäten buchen
        </button>
        <button
          onClick={scrollToTop}
          className="bg-caramel hover:bg-[#0e5756] text-white py-2 px-4 rounded flex items-center gap-2 text-sm"
        >
          <FaArrowUp /> Nach oben scrollen
        </button>
      </div>
    </div>
  );
};

const ActivitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
