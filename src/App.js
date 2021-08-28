import React, { useState, useEffect } from "react";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank";
import plants from "./constants/plants";
import { objectToArray } from "./helpers/commonFunctions";

const plantsList = objectToArray(plants);

export default function App() {
  const [planting, setPlanting] = useState([...Array(45).fill({ image: "" })]);

  useEffect(() => {
    // block dragging of images
    window.ondragstart = () => false;
  }, []);

  return (
    <div className="gd-container">
      <div className="gd-container-game">
        <SendBack plants={plantsList} />
        <Garden plants={planting} />
      </div>
    </div>
  );
}
