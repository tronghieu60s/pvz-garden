import React, { useState } from "react";

export default () => {
  const [isGetGlove, setIsGetGlove] = useState(false);

  const handleGetGlove = () => {
    setIsGetGlove(!isGetGlove);
  };

  return (
    <div className="bank" onClick={() => handleGetGlove()}>
      <div className={isGetGlove ? "" : "glove"}></div>
    </div>
  );
};
