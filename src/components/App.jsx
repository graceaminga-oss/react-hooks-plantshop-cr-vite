import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API = "http://localhost:6001/plants";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // FETCH ON LOAD
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  // ADD NEW PLANT (POST)
  function addPlant(newPlant) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => setPlants([...plants, data]));
  }

  function toggleSoldOut(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id
          ? { ...plant, soldOut: !plant.soldOut }
          : plant
      )
    );
  }

  // SEARCH FILTER
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* SEARCH */}
      <Search search={search} setSearch={setSearch} />

      {/* FORM */}
      <NewPlantForm onAddPlant={addPlant} />

      {/* LIST */}
      <PlantList
        plants={filteredPlants}
        onToggleStock={toggleSoldOut}
      />
    </div>
  );
}

export default App;
