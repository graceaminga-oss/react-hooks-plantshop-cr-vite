import React from "react";

function PlantCard({ plant, onToggleStock }) {
  const { id, name, image, price, soldOut } = plant;

  function handleStockClick() {
    onToggleStock(id);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />

      <h4>{name}</h4>

      <p>Price: {price}</p>

      <button
        onClick={handleStockClick}
        className={soldOut ? "" : "primary"}
      >
        {soldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;