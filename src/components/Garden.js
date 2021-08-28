import React from "react";
import GardenItem from "./GardenItem";

export default (props) => {
  const {
    planting,
    choosePlant,
    isSelectedPlant,
    coinBankVal,
    setCoinBankVal,
  } = props;

  return (
    <div className="gd-garden">
      {planting.map((plant, index) => (
        <GardenItem
          key={index}
          plant={plant}
          choosePlant={choosePlant}
          positionGardenItem={index}
          isSelectedPlant={isSelectedPlant}
          coinBankVal={coinBankVal}
          setCoinBankVal={setCoinBankVal}
        />
      ))}
    </div>
  );
};
