import React from "react";
import SendBackItem from "./SendBankItem";

export default function SendBank(props) {
  const { plants } = props;
  return (
    <div className="gd-sendBank">
      {plants.map((item) => (
        <SendBackItem key={item.key} plant={item} />
      ))}
    </div>
  );
}
