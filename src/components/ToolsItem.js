import React, { useEffect } from "react";

const image = "./assets/images/inf/glove.png";

export default function ToolsItem(props) {
  const { style, image, isSelect, setIsSelect } = props;

  useEffect(() => {
    isSelect
      ? (document.body.style.cursor = `url(${image}) 40 40, auto`)
      : (document.body.style.cursor = `auto`);
  }, [isSelect]);

  return (
    <div
      className="gd-bank"
      style={style}
      onClick={() => setIsSelect(!isSelect)}
    >
      <div
        className={isSelect ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
}
