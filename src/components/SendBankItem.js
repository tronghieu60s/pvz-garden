import React, { useState } from "react";

export default function sendBankItem(props) {
  const { plant, choosePlant, setChoosePlant, setIsSelectedPlant } = props;

  return (
    <div
      className={`gd-sendBank-item${
        choosePlant.key !== plant.key ? " active" : ""
      }`}
      onClick={() => {
        setChoosePlant(plant);
        setIsSelectedPlant(true);
      }}
    >
      <img src={plant.image1b} alt="" />
      <img src={plant.image2b} alt="" />
      <div className="gd-sendBank-item-point">{plant.point}</div>
    </div>
  );
}
