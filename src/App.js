import React, { useState, useEffect, Fragment } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank";
import StartGame from "./components/StartGame";
import Glove from "./components/Tools/Glove";
import Shovel from "./components/Tools/Shovel";
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";

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
    const soundTrack = new Audio("./assets/sounds/soundtrack.mp3");
    soundTrack.loop = true;
    soundTrack.play();
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
    if (coinPrice < 0) {
      return alert("Bro không có đủ tiền. Hãy nạp lần đầu đi bro!!!");
    }
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
            setPlant={handleSetPlant}
            deletePlant={handleDeletePlant}
            harvestPlant={handleHarvestPlant}
          />
          <CoinBank coinBankVal={coinBankVal} />
          <div>
            <Glove isGetGlove={isGetGlove} setIsGetGlove={setIsGetGlove} />
            <Shovel isGetShovel={isGetShovel} setIsGetShovel={setIsGetShovel} />
          </div>
        </div>
      </div>
    </div>
  );
}
