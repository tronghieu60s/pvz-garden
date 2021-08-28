import React from "react";
import GardenItem from "./GardenItem";

export default (props) => {
  const { planting, setPlanting, choosePlant } = props;
  return (
    <div className="gd-garden">
      {planting.map((plant, index) => (
        <GardenItem
          setPlanting={setPlanting}
          key={index}
          plant={plant}
          choosePlant={choosePlant}
          positionGardenItem={index}
        />
      ))}
    </div>
  );
};
