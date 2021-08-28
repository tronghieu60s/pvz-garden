import React from "react";

export default (props) => {
  const { coinBankVal } = props;

  return (
    <div className="coinbank">
      <div className="coinbank-val">{coinBankVal}</div>
    </div>
  );
};
