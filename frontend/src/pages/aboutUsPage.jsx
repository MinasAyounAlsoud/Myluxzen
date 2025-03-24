import React from "react";
import aboutUsImgMinas from "../assets/aboutUsImg/minas.jpg";
import aboutUsImgNaheeda from "../assets/aboutUsImg/Naheeda.jpg";
import aboutUsImgXiangyu from "../assets/aboutUsImg/Xiangyu.jpg";
import MiniNavbar from "../components/navbarMini/NavbarMini";
import Footer from "../components/footer/Footer";
const teamMembers = [
  {
    name: "Fatima",
    image: "",
    description:
      "Fatima ist die Gründerin von Myluxzen, die mit viel Leidenschaft und Vision das Hotel erschaffen hat. Ihr Ziel ist es, Gästen unvergessliche Erlebnisse in einem luxuriösen und entspannten Ambiente zu bieten.",
  },
  {
    name: "Minas",
    image: aboutUsImgMinas,
    description:
      "Minas ist Mitbegründerin von Myluxzen und sorgt dafür, dass jeder Aufenthalt der Gäste ein perfektes Erlebnis wird. Ihr Augenmerk liegt auf exzellentem Service und einem hohen Standard in jeder Hinsicht.",
  },
  {
    name: "Naheeda",
    image: aboutUsImgNaheeda,
    description:
      "Naheeda ist Mitgründerin und die kreative Seele von Myluxzen. Sie sorgt dafür, dass jede Unterkunft einladend und einzigartig gestaltet ist, um den Gästen ein Gefühl von Luxus und Komfort zu vermitteln.",
  },
  {
    name: "Xiangyu",
    image: aboutUsImgXiangyu,
    description:
      "Xiangyu ist Mitgründerin und die organisatorische Stütze von Myluxzen. Sie sorgt dafür, dass alle Prozesse reibungslos ablaufen und jeder Gast die bestmögliche Erfahrung während seines Aufenthalts hat.",
  },
];

const AboutUs = () => {
  return (
    <div>
      <MiniNavbar />
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold text-[#064236] mb-4">Unser Team</h1>
          {/* <div className="flex flex-row justify-center gap-10 mt-10 mb-10"> */}
          <div className="flex flex-wrap justify-center gap-2 mt-10 mb-10 md:grid md:grid-cols-2 lg:grid-cols-4 bg-white ">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className=" shadow-md bg-white p-6 rounded-2xl  w-77 text-center transform transition duration-300 hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-[#d1a26f]"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {member.name}
                </h2>
                <p className="text-gray-600 mt-3 leading-relaxed text-lg mt-2">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
          <div className="shadow-md bg-white p-8 rounded-lg  mb-10 transform transition duration-300 hover:scale-105">
            <h2 className="text-4xl font-bold text-[#064236] mb-6">MyLuxzen</h2>
            <p className="text-lg text-gray-600 mb-8">
              **MyLuxzen** ist eine exklusive Plattform für die Buchung von
              Luxusferienwohnungen. Genießen Sie einen luxuriösen Aufenthalt an
              den schönsten Reisezielen. Unser Ziel ist es, Ihnen unvergessliche
              Erlebnisse in den exklusivsten Unterkünften zu bieten, die nur das
              Beste für Sie bereithalten.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Bei **MyLuxzen** finden Sie nicht nur eine Unterkunft, sondern ein
              Erlebnis. Wir bieten handverlesene Luxusvillen und exklusive
              Resorts an, die Ihnen den höchsten Komfort und erstklassigen
              Service bieten. Jede unserer Unterkünfte wurde sorgfältig
              ausgewählt, um Ihnen das Gefühl von Ruhe und Luxus zu vermitteln,
              während Sie gleichzeitig an atemberaubenden Reisezielen verweilen.
              Unser Team ist stets bemüht, Ihre Wünsche zu erfüllen und Ihre
              Erwartungen zu übertreffen – damit Sie sich während Ihres
              Aufenthalts bei uns vollkommen entspannen können.
            </p>
          </div>
          <div className="shadow-md bg-white p-8 rounded-lg  mb-10 transform transition duration-300 hover:scale-105">
            <h2 className="text-4xl font-bold text-[#064236] mb-6">
              Unsere Häuser und Unterkünfte
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Unsere exklusiven Häuser und Villen wurden mit Liebe zum Detail
              ausgewählt. Jedes Haus bietet nicht nur Luxus, sondern auch
              atemberaubende Ausblicke und erstklassigen Service. Wir bieten
              verschiedene Arten von Ferienhäusern, die auf Ihre individuellen
              Bedürfnisse zugeschnitten sind. Von modernen Luxusvillen bis zu
              traditionellen, charmanten Unterkünften haben wir für jedes Paar
              oder jede Familie die perfekte Option.
            </p>
            <ul className="list-disc text-left text-lg text-gray-600 pl-8">
              <li>Luxusvillen mit privaten Pools</li>
              <li>Exklusive Strandhäuser</li>
              <li>Schwimmbäder und Spas</li>
              <li>Elegante Innenräume und geräumige Wohnzimmer</li>
              <li>Nahe zu den schönsten Sehenswürdigkeiten</li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
            <h2 className="text-4xl font-bold text-[#064236] mb-6">
              Warum MyLuxzen?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Wir von **MyLuxzen** haben es uns zur Aufgabe gemacht, Ihnen nicht
              nur eine Unterkunft zu bieten, sondern ein einzigartiges Erlebnis.
              Hier sind einige Gründe, warum Sie sich für uns entscheiden
              sollten:
            </p>
            <ul className="list-disc text-left text-lg text-gray-600 pl-8">
              <li>Persönliche Beratung und maßgeschneiderte Angebote</li>
              <li>24/7 Concierge-Service, um Ihre Wünsche zu erfüllen</li>
              <li>Luxuriöse Ausstattung und exklusive Annehmlichkeiten</li>
              <li>Handverlesene, einzigartige Unterkünfte</li>
              <li>Unvergessliche Erlebnisse und Aktivitäten in der Nähe</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
