import React from "react";

export default function sendBankItem(props) {
  const { plant, choosePlant, setChoosePlant } = props;
  return (
    <div
      className={`gd-sendBank-item${
        plant?.key !== choosePlant?.key ? " active" : ""
      }`}
      onClick={setChoosePlant}
    >
      <img src={plant.image1b} />
      <img src={plant.image2b} />
      <div className="gd-sendBank-item-price">
        {plant.purchasePrice}
      </div>
    </div>
  );
}
