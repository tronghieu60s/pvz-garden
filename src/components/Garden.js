import React from "react";
import GardenItem from "./GardenItem";

export default function Garden(props) {
  const { plants, choosePlant, setPlant, deletePlant, harvestPlant } = props;
  return (
    <div className="gd-garden">
      {plants.map((plant, index) => (
        <GardenItem
          key={index}
          plant={plant}
          choosePlant={choosePlant}
          setPlant={() => setPlant(index)}
          deletePlant={() => deletePlant(index)}
          harvestPlant={() => harvestPlant(index)}
        />
      ))}
    </div>
  );
}
