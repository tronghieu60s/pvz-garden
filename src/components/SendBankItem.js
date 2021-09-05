import React from "react";

export default function sendBankItem(props) {
  const { coinBankVal, plant, choosePlant, setChoosePlant } = props;

  const isActive =
    plant?.key !== choosePlant?.key && coinBankVal >= plant?.purchasePrice;
  const onClick = () => {
    if (coinBankVal >= plant?.purchasePrice) {
      setChoosePlant(plant);
    }
  };

  return (
    <div
      className={`gd-sendBank-item${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      <img src={plant.image1b} />
      <img src={plant.image2b} />
      <div className="gd-sendBank-item-price">{plant.purchasePrice}</div>
    </div>
  );
}
