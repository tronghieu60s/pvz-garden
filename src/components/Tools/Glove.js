import React from "react";

export default function Glove(props) {
  const { isGetGlove, setIsGetGlove } = props;

  const handleGetGlove = () => {
    setIsGetGlove(!isGetGlove);
    isGetGlove
      ? (document.body.style.cursor = `auto`)
      : (document.body.style.cursor = `url('../assets/images/tools/glove.png') 40 40, auto`);
  };

  return (
    <div className="gd-bank" onClick={() => handleGetGlove()}>
      <div className={isGetGlove ? "" : "gd-glove"}></div>
    </div>
  );
}
