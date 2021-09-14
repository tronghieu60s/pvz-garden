import React from "react";

export default function sendBankItem(props) {
  const { coinBankVal, plant, choosePlant, setChoosePlant } = props;

  const isActive =
    plant?.key !== choosePlant?.key && coinBankVal >= plant?.purchasePrice;
  const isSelect = plant?.key === choosePlant?.key;
  const onClick = () => {
    if (coinBankVal >= plant?.purchasePrice) {
      setChoosePlant(plant);
    } else {
      new Audio("./assets/sounds/pause.ogg").play();
    }
  };

  return (
    <div
      className={`gd-sendBank-item${isActive ? " active" : ""}`}
      style={{ color: isSelect ? "red" : "black" }}
      onClick={onClick}
    >
      <img src={plant.image1b} />
      <img src={plant.image2b} />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </div>
  );
}
