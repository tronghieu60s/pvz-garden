import React,{useState} from "react";

export default function sendBankItem(props) {
  const { plant, active = true, choosePlantKey, setChoosePlantKey } = props;
 
  return (
    <div
      className={`gd-sendBank-item${choosePlantKey !== plant.key ? " active" : ""}`}
      onClick={() => {
        setChoosePlantKey(plant.key);
      }}
    >
      <img src={plant.image1b} alt="" />
      <img src={plant.image2b} alt="" />
      <div className="gd-sendBank-item-point">{plant.point}</div>
    </div>
  );
}
