import React from "react";
import SendBackItem from "./SendBankItem";

export default function SendBank(props) {
  const { coinBankVal, plants, choosePlant, setChoosePlant } = props;
  return (
    <div className="gd-sendBank">
      {plants.map((plant) => (
        <SendBackItem
          key={plant.key}
          coinBankVal={coinBankVal}
          plant={plant}
          choosePlant={choosePlant}
          setChoosePlant={() => setChoosePlant(plant)}
        />
      ))}
    </div>
  );
}
