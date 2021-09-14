import React, { useState } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank/index";
import StartGame from "./components/StartGame";
import ToolsItem from "./components/ToolsItem";
import plants from "./constants/plants";
import { isEmptyObject, objectToArray } from "./helpers/commonFunctions";

const plantsList = objectToArray(plants);

const backgroundImages = [
  "background0.jpg",
  "background1.jpg",
  "background2.jpg",
];

const infImage = "./assets/images/inf/";

window.ondragstart = () => false;

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [background, setBackground] = useState(backgroundImages[-1]);

  const [coinBankVal, setCoinBankVal] = useState(500); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);

  const [toolSelected, setToolSelected] = useState("");

  const handleToolSelect = (name) => {
    document.body.style.cursor = `url(${infImage}${name}.png) 40 40, auto`;
    setToolSelected(name);
  };

  const handleSoundTrack = () => {
    setIsReady(false);

    // const soundTrack = new Audio("./assets/sounds/soundtrack.mp3");
    // soundTrack.loop = true;
    // soundTrack.play();
  };

  const handleStartGame = async () => {
    setIsReady(true);
    setBackground(backgroundImages[Math.floor(Math.random() * 3)]);

    // sound track
    const soundReady = new Audio("./assets/sounds/readysetplant.mp3");
    soundReady.play();
    soundReady.onended = () => handleSoundTrack();
  };

  const handleSetPlant = (index) => {
    // check plant exists and selected
    if (!choosePlant || !isEmptyObject(plants[index])) {
      return new Audio("./assets/sounds/pause.ogg").play();
    }

    // price action
    const coinPrice = coinBankVal - choosePlant.purchasePrice;
    setCoinBankVal(coinPrice);

    // set plants
    const newPlants = [...plants];
    newPlants[index] = choosePlant;
    setPlants(newPlants);
    setChoosePlant(null);

    // play sound plant
    new Audio("./assets/sounds/plant.ogg").play();
  };

  const handleDeletePlant = (index) => {
    // delete plants
    const newPlants = [...plants];
    newPlants[index] = {};
    setPlants(newPlants);
  };

  const handleHarvestPlant = (index) => {
    new Audio("./assets/sounds/coin.ogg").play();

    const price = plants[index].salePrice || 0;
    setCoinBankVal(coinBankVal + price);
  };

  return (
    <div className="gd-container">
      {isReady && <div className="gd-start-ready"></div>}
      {background === undefined && <StartGame onClick={handleStartGame} />}
      <div
        className="gd-container-game"
        style={{ backgroundImage: `url(${infImage}${background})` }}
      >
        <div style={{ display: background === undefined ? "none" : "block" }}>
          <SendBack
            coinBankVal={coinBankVal}
            plants={plantsList}
            choosePlant={choosePlant}
            setChoosePlant={(plant) =>
              setChoosePlant(plant === choosePlant ? null : plant)
            }
          />
          <Garden
            plants={plants}
            choosePlant={choosePlant}
            toolSelected={toolSelected}
            setToolSelected={handleToolSelect}
            setPlant={handleSetPlant}
            deletePlant={handleDeletePlant}
            harvestPlant={handleHarvestPlant}
          />
          <CoinBank coinBankVal={coinBankVal} />
          <div className="gd-bank-list">
            <ToolsItem
              name="glove"
              isSelect={toolSelected}
              setIsSelect={handleToolSelect}
            />
            <ToolsItem
              name="shovel"
              style={{ top: "105px" }}
              isSelect={toolSelected}
              setIsSelect={handleToolSelect}
            />
            <ToolsItem
              name="tree-food"
              style={{ top: "360px" }}
              isSelect={toolSelected}
              setIsSelect={handleToolSelect}
            />
            <ToolsItem
              name="watering-can"
              style={{ top: "190px" }}
              isSelect={toolSelected}
              setIsSelect={handleToolSelect}
            />
            <ToolsItem
              name="phonograph"
              style={{ top: "275px" }}
              isSelect={toolSelected}
              setIsSelect={handleToolSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
