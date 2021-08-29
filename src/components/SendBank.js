import React from "react";
import SendBackItem from "./SendBankItem";

export default function SendBank(props) {
  const { plants, choosePlant, setChoosePlant } = props;
  return (
    <div className="gd-sendBank">
      {plants.map((plant) => (
        <SendBackItem
          key={plant.key}
          plant={plant}
          choosePlant={choosePlant}
          setChoosePlant={() => setChoosePlant(plant)}
        />
      ))}
    </div>
  );
}
