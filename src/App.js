import React, { useEffect, useState } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank/index";
import StartGame from "./components/StartGame";
import ToolsItem from "./components/ToolsItem";
import {
  PATH_BACKGROUND_IMAGES,
  PATH_COIN_SOUND,
  PATH_INF,
  PATH_PAUSE_SOUND,
  PATH_PLANT_SOUND,
  PATH_QUIT_IMAGE,
  PATH_READY_SOUND,
} from "./constants/config";
import plants from "./constants/plants";
import { isEmptyObject, objectToArray } from "./helpers/commonFunctions";

window.ondragstart = () => false;
const plantsList = objectToArray(plants);

export default function App() {
  const [isReady, setIsReady] = useState(false); // ready to start game
  const [background, setBackground] = useState(PATH_BACKGROUND_IMAGES[-1]); // background images

  const [toolSelected, setToolSelected] = useState(""); // selected tool
  const [coinBankVal, setCoinBankVal] = useState(100); // money
  const [plants, setPlants] = useState([...Array(45).fill({})]); // plants 9 x 5 = 45 plants
  const [choosePlant, setChoosePlant] = useState(null); // plant selected

  useEffect(() => {
    // if game started
    window.scrollTo(0, 1);
    const started = localStorage.getItem("game-started");
    if (started) {
      // set background image
      setBackground(PATH_BACKGROUND_IMAGES[Math.floor(Math.random() * 3)]);
      handleSoundTrack();

      // get background from localStorage
      const background = localStorage.getItem("game-background");
      setBackground(background);

      const coinBank = localStorage.getItem("game-coin-bank");
      setCoinBankVal(parseInt(coinBank));
    }
  }, []);

  useEffect(
    () => localStorage.setItem("game-coin-bank", coinBankVal),
    [coinBankVal]
  );

  useEffect(() => {
    const everyEmpty = plants.every(o => isEmptyObject(o));
    if (everyEmpty && coinBankVal < 50) {
      alert("Game over!");
      localStorage.removeItem("game-started");
      window.location.reload();
    }
  });

  /* Handle Others */

  const handleToolSelect = (name) => {
    document.body.style.cursor = name
      ? `url(${PATH_INF}${name}.png) 40 40, auto`
      : "";
    setToolSelected(name);
  };

  const handleSoundTrack = () => {
    setIsReady(false);

    const soundTrack = new Audio("./assets/sounds/soundtrack.mp3");
    soundTrack.loop = true;
    soundTrack.play();
  };

  /* Handle Game */

  const handleStartGame = async () => {
    const background = PATH_BACKGROUND_IMAGES[Math.floor(Math.random() * 3)];
    setBackground(background);
    setIsReady(true);

    // sound track
    const soundReady = new Audio(PATH_READY_SOUND);
    soundReady.play();
    soundReady.onended = () => handleSoundTrack();

    // storage started
    localStorage.setItem("game-started", true);
    localStorage.setItem("game-background", background);
  };

  const handleQuitGame = () => {
    if (confirm("Are you sure you want to quit?")) {
      localStorage.removeItem("game-started");
      localStorage.removeItem("game-background");
      localStorage.removeItem("game-coin-bank");
      window.location.reload();
    }
  };

  /* Handle Plants */

  const handleSetPlant = (index) => {
    // check plant exists and selected
    if (!choosePlant || !isEmptyObject(plants[index])) {
      return new Audio(PATH_PAUSE_SOUND).play();
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
    new Audio(PATH_PLANT_SOUND).play();
  };

  const handleDeletePlant = (index) => {
    // delete plants
    const newPlants = [...plants];
    newPlants[index] = {};
    setPlants(newPlants);
  };

  const handleHarvestPlant = (price = 0) => {
    new Audio(PATH_COIN_SOUND).play();
    setCoinBankVal(coinBankVal + price);
  };

  const rdZombieNote = `ZombieNote${Math.floor(
    Math.random() * (5 - 1) + 1
  )}.png`;
  const backgroundImage = background !== undefined ? `url(${background})` : "";

  return (
    <div
      className="gd-container"
      style={{ backgroundImage: `url(${PATH_INF}${rdZombieNote})` }}
    >
      {isReady && <div className="gd-start-ready"></div>}
      {background !== undefined && (
        <div className="gd-quit">
          <img src={PATH_QUIT_IMAGE} onClick={handleQuitGame} />
        </div>
      )}
      {background === undefined && <StartGame onClick={handleStartGame} />}
      <div className="gd-container-game" style={{ backgroundImage }}>
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
