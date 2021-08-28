import React, { useState } from "react";
import SendBackItem from "./SendBankItem";

export default function SendBank(props) {
  const { plants, choosePlant, setChoosePlant } = props;
  return (
    <div className="gd-sendBank">
      {plants.map((item) => (
        <SendBackItem
          key={item.key}
          plant={item}
          choosePlant={choosePlant}
          setChoosePlant={setChoosePlant}
        />
      ))}
    </div>
  );
}
