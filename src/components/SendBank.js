import React, { useState } from "react";
import SendBackItem from "./SendBankItem";

export default function SendBank(props) {
  const { plants } = props;
   const [choosePlantKey, setChoosePlantKey] = useState("plant1");
  return (
    <div className="gd-sendBank">
      {plants.map((item) => (
        <SendBackItem key={item.key} plant={item} choosePlantKey={choosePlantKey} setChoosePlantKey={setChoosePlantKey} />
      ))}
    </div>
  );
}
