import React from "react";
import { PATH_INF } from "../constants/config";

export default function ToolsItem(props) {
  const { style, name, isSelect, setIsSelect } = props;
  return (
    <div className="gd-bank" style={style} onClick={() => setIsSelect(name === isSelect ? "" : name)}>
      <div
        className={isSelect === name ? "" : "gd-bank-image"}
        style={{ backgroundImage: `url(${PATH_INF}${name}.png)` }}
      ></div>
    </div>
  );
}
