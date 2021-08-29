import React from "react";

export default function CoinBank(props) {
  const { coinBankVal } = props;

  return (
    <div className="coinBank">
      <div className="coinBank-val">{coinBankVal}</div>
    </div>
  );
}
