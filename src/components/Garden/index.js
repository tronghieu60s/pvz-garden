import React from "react";
import GardenItem from "./GardenItem";

export default function Garden(props) {
  const { plants, setPlant, deletePlant, harvestPlant, ...othersProps } = props;
  return (
    <div className="gd-garden">
      {plants.map((plant, index) => (
        <GardenItem
          key={index}
          plant={plant}
          setPlant={() => setPlant(index)}
          deletePlant={() => deletePlant(index)}
          harvestPlant={() => harvestPlant(index)}
          {...othersProps}
        />
      ))}
    </div>
  );
}
