import React from "react";

export default function sendBankItem(props) {
  const { plant, active = true } = props;
  return (
    <div className={`gd-sendBank-item${active ? " active" : ""}`}>
      <img src={plant.image1b} alt="" />
      <img src={plant.image2b} alt="" />
      <div className="gd-sendBank-item-point">{plant.point}</div>
    </div>
  );
}
