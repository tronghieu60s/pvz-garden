import React, { useEffect, useState } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank/index";
import StartGame from "./components/StartGame";
import ToolsItem from "./components/ToolsItem";
import plants from "./constants/plants";
import { isEmptyObject, objectToArray } from "./helpers/commonFunctions";

const plantsList = objectToArray(plants);

const infImage = "./assets/images/inf/";

const backgroundImages = [
  "background0.jpg",
  "background1.jpg",
  "background2.jpg",
];

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [background, setBackground] = useState(backgroundImages[-1]);

  const [coinBankVal, setCoinBankVal] = useState(500); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);

  const [isGetGlove, setIsGetGlove] = useState(false);
  const [isGetShovel, setIsGetShovel] = useState(false);

  useEffect(() => {
    // block dragging of images
    window.ondragstart = () => false;
  }, []);

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
    const soundPlant = new Audio("./assets/sounds/plant.ogg");
    soundPlant.play();
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
            isGetGlove={isGetGlove}
            setIsGetGlove={setIsGetGlove}
            isGetShovel={isGetShovel}
            setIsGetShovel={setIsGetShovel}
            setPlant={handleSetPlant}
            deletePlant={handleDeletePlant}
            harvestPlant={handleHarvestPlant}
          />
          <CoinBank coinBankVal={coinBankVal} />
          <div>
            <ToolsItem
              image="./assets/images/inf/glove.png"
              isSelect={isGetGlove}
              setIsSelect={setIsGetGlove}
            />
            <ToolsItem
              style={{ top: "105px" }}
              image="./assets/images/inf/shovel.png"
              isSelect={isGetShovel}
              setIsSelect={setIsGetShovel}
            />
            <ToolsItem
              style={{ top: "360px" }}
              image="./assets/images/inf/tree-food.png"
              isSelect={isGetShovel}
              setIsSelect={setIsGetShovel}
            />
            <ToolsItem
              style={{ top: "190px" }}
              image="./assets/images/inf/watering_can.png"
              isSelect={isGetShovel}
              setIsSelect={setIsGetShovel}
            />
            <ToolsItem
              style={{ top: "275px" }}
              image="./assets/images/inf/phonograph.png"
              isSelect={isGetShovel}
              setIsSelect={setIsGetShovel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
