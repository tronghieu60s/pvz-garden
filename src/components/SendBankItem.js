import React, { useState } from "react";

export default function sendBankItem(props) {
  const { plant, choosePlant, setChoosePlant, setIsSelectedPlant } = props;

  const [planting, setPlanting] = useState([
    ...Array(45).fill({ image: null, point: null, key: null }),
  ]);

  const [isActivePlant, setIsActivePlant] = useState(false); // check selected plant in left column

  return (
    <div
      className={`gd-sendBank-item${
        choosePlant.key !== plant.key ? " active" : ""
      }`}
      onClick={() => {
        if (isActivePlant) {
          setChoosePlant(planting[0]);
          setIsSelectedPlant(false); //check for alert Vui lòng chọn cây
          setIsActivePlant(false);
        } else {
          setChoosePlant(plant);
          setIsSelectedPlant(true);
          setIsActivePlant(true);
        }
      }}
    >
      <img src={plant.image1b} alt="" />
      <img src={plant.image2b} alt="" />
      <div className="gd-sendBank-item-purchase-price">
        {plant.purchasePrice}
      </div>
    </div>
  );
}
