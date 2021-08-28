import React, { useState } from "react";

export default function sendBankItem(props) {
  const { plant, active = true, choosePlant, setChoosePlant } = props;

  return (
    <div
      className={`gd-sendBank-item${
        choosePlant.key !== plant.key ? " active" : ""
      }`}
      onClick={() => {
        setChoosePlant(plant);
      }}
    >
      <img src={plant.image1b} alt="" />
      <img src={plant.image2b} alt="" />
      <div className="gd-sendBank-item-point">{plant.point}</div>
    </div>
  );
}
