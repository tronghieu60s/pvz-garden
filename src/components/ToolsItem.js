import React from "react";

export default function ToolsItem(props) {
  const { style, name, isSelect, setIsSelect } = props;

  return (
    <div className="gd-bank" style={style} onClick={() => setIsSelect(name === isSelect ? "" : name)}>
      <div
        className={isSelect === name ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(./assets/images/inf/${name}.png)` }}
      ></div>
    </div>
  );
}
