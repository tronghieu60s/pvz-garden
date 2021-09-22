import React from "react";

export default function CoinBank(props) {
  const { coinBankVal } = props;
  return (
    <div className="gd-coinBank">
      <div className="gd-coinBank-val">{coinBankVal}</div>
    </div>
  );
}
