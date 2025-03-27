import React, { useState, useEffect } from "react";

export function AdminHausBeschreibung() {
  const [houses, setHouses] = useState([]);
  const [updatedHouseData, setUpdatedHouseData] = useState({
    title: "",
    description: "",
    guests: "",
    bedrooms: "",
    livingRoom: "",
    terrace: "",
    toilet: "",
    bathroom: "",
    pricePerNight: "",
  });

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/houses");
      if (!response.ok) throw new Error("Fehler beim Laden der Häuser");
      const data = await response.json();
      setHouses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateHouse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/houses/${updatedHouseData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHouseData),
        }
      );
      if (!response.ok) throw new Error("Fehler beim Aktualisieren");
      fetchHouses();
      setUpdatedHouseData({
        title: "",
        description: "",
        guests: "",
        bedrooms: "",
        livingRoom: "",
        terrace: "",
        toilet: "",
        bathroom: "",
        pricePerNight: "",
        roomAmenities: {
          bathroomInfo: "",
          internetInfo: "",
          heatingInfo: "",
          kitchenInfo: "",
          entertainment: "",
          homeSafety: "",
        },
      });
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHouseData({ ...updatedHouseData, [name]: value });
  };

  const handleEditClick = (house) => {
    setUpdatedHouseData({
      _id: house._id,
      title: "Title : " + house.title,
      description: "Description : " + house.description,
      roomAmenities: {
        bathroomInfo:
          "bathroomInfo : " + house.roomAmenities?.bathroomInfo || "",
        internetInfo:
          "internetInfo : " + house.roomAmenities?.internetInfo || "",
        heatingInfo: "heatingInfo : " + house.roomAmenities?.heatingInfo || "",
        kitchenInfo: "kitchenInfo : " + house.roomAmenities?.kitchenInfo || "",
        entertainment:
          "entertainment : " + house.roomAmenities?.entertainment || "",
        homeSafety: "homeSafety : " + house.roomAmenities?.homeSafety || "",
      },

      pricePerNight: "Preis pro Nacht : " + house.pricePerNight,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">
        Admin HausBeschreibung
      </h2>
      {/* Häuserliste */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.length > 0 ? (
          houses.map((house) => (
            <div
              key={house._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-5">{house.title}</h3>
              <p className="text-gray-600 mb-5">{house.description}</p>
              <div className="flex-grow">
                <p className="text-gray-600">Gäste: {house.guests}</p>
                <p className="text-gray-600">Schlafzimmer: {house.bedrooms}</p>
                <p className="text-gray-600">Wohnzimmer: {house.livingRoom}</p>
                <p className="text-gray-600">Terrasse: {house.terrace}</p>
                <p className="text-gray-600">Toiletten: {house.toilet}</p>
                <p className="text-gray-600">Badezimmer: {house.bathroom}</p>

                {/* Room Amenities */}
                <p className="text-gray-600">
                  Bathroom Info: {house.roomAmenities.bathroomInfo}
                </p>
                <p className="text-gray-600">
                  Internet Info: {house.roomAmenities.internetInfo}
                </p>
                <p className="text-gray-600">
                  Heating Info: {house.roomAmenities.heatingInfo}
                </p>
                <p className="text-gray-600">
                  Kitchen Info: {house.roomAmenities.kitchenInfo}
                </p>
                <p className="text-gray-600">
                  Entertainment: {house.roomAmenities.entertainment}
                </p>
                <p className="text-gray-600">
                  Home Safety: {house.roomAmenities.homeSafety}
                </p>

                {/* Preis pro Nacht */}
                <p className="text-gray-700">
                  <strong>{house.pricePerNight} €</strong> pro Nacht
                </p>
              </div>

              {/* Bearbeiten Button */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => handleEditClick(house)}
                  className="bg-gray-800 text-white px-6 py-3 rounded-md cursor-pointer hover:text-[#fae1a8]"
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Keine Häuser gefunden.</p>
        )}
      </div>

      {/* Haus aktualisieren */}
      {updatedHouseData._id && (
        <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            Haus bearbeiten
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              name="title"
              value={updatedHouseData.title}
              onChange={handleChange}
              placeholder="Titel"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="guests"
              value={updatedHouseData.guests}
              onChange={handleChange}
              placeholder="Gäste"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="bedrooms"
              value={updatedHouseData.bedrooms}
              onChange={handleChange}
              placeholder="Schlafzimmer"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="livingRoom"
              value={updatedHouseData.livingRoom}
              onChange={handleChange}
              placeholder="Wohnzimmer"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="terrace"
              value={updatedHouseData.terrace}
              onChange={handleChange}
              placeholder="Terrasse"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="toilet"
              value={updatedHouseData.toilet}
              onChange={handleChange}
              placeholder="Toiletten"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              name="bathroom"
              value={updatedHouseData.bathroom}
              onChange={handleChange}
              placeholder="Badezimmer"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              name="description"
              value={updatedHouseData.description}
              onChange={handleChange}
              placeholder="Beschreibung"
              className="w-full h-60 p-2 border rounded-md"
            />
            <input
              type="text"
              name="roomAmenities.bathroomInfo"
              value={updatedHouseData.roomAmenities.bathroomInfo}
              onChange={handleChange}
              placeholder="Badezimmer-Info"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="roomAmenities.internetInfo"
              value={updatedHouseData.roomAmenities.internetInfo}
              onChange={handleChange}
              placeholder="Internet-Info"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="roomAmenities.heatingInfo"
              value={updatedHouseData.roomAmenities.heatingInfo}
              onChange={handleChange}
              placeholder="Heizung-Info"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="roomAmenities.kitchenInfo"
              value={updatedHouseData.roomAmenities.kitchenInfo}
              onChange={handleChange}
              placeholder="Küchen-Info"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="roomAmenities.entertainment"
              value={updatedHouseData.roomAmenities.entertainment}
              onChange={handleChange}
              placeholder="Entertainment"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="text"
              name="roomAmenities.homeSafety"
              value={updatedHouseData.roomAmenities.homeSafety}
              onChange={handleChange}
              placeholder="Sicherheitsausstattung"
              className="w-full p-2 border rounded-md"
            />

            <input
              type="number"
              name="pricePerNight"
              value={updatedHouseData.pricePerNight}
              onChange={handleChange}
              placeholder="Preis pro Nacht"
              className="w-full p-2 border rounded-md"
            />
          </form>

          <button
            onClick={updateHouse}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer hover:text-[#fae1a8]"
          >
            Speichern
          </button>
        </div>
      )}
    </div>
  );
}
