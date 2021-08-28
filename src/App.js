import React from "react";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank";

export default function App() {
  return (
    <div className="gd-container">
      <div className="gd-container-game">
        <SendBack />
        <Garden />
      </div>
    </div>
  );
}
