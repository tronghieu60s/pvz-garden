import React from "react";
import Glove from "./Glove";

export default function Tools({ isGetGlove, setIsGetGlove }) {
  return (
    <div>
      <Glove isGetGlove={isGetGlove} setIsGetGlove={setIsGetGlove} />
    </div>
  );
}
