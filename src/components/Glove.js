import React, { useState } from "react";

export default function Glove() {
  const [isGetGlove, setIsGetGlove] = useState(false);

  const handleGetGlove = () => {
    setIsGetGlove(!isGetGlove);
  };

  return (
    <div className="gd-bank" onClick={() => handleGetGlove()}>
      <div className={isGetGlove ? "" : "gd-glove"}></div>
    </div>
  );
}
