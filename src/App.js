import React, { useState, useEffect } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import SendBack from "./components/SendBank";
import Sound from "./components/Sound";
import Tools from "./components/Tools/Tools";
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";

const plantsList = objectToArray(plants);

export default function App() {
  const [coinBankVal, setCoinBankVal] = useState(99999); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);
  const [isGetGlove, setIsGetGlove] = useState(false);
  const [isNoMoreMoney, setIsNoMoreMoney] = useState(false);
  const [modeTool, setModeTool] = useState("grow"); //grow, harvest, asperse, fertilize

  useEffect(() => {
    // block dragging of images
    window.ondragstart = () => false;
  }, []);

  const handleSetPlant = (index) => {
    const soundPlant = new Audio("./assets/sounds/plant.ogg");
    //play sound plant
    soundPlant.play();
    // check plant exists and selected
    if (!choosePlant) {
      return alert("Vui lòng chọn cây cần trồng trước.");
    }
    if (!isEmptyObject(plants[index])) {
      return alert("Cây đã được trồng, vui lòng chọn ô khác.");
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
  };

  const handleDeletePlant = (index) => {
    // delete plants
    const newPlants = [...plants];
    newPlants[index] = {};
    setPlants(newPlants);
  };

  return (
    <div className="gd-container">
      <div className="gd-container-game">
        <SendBack
          plants={plantsList}
          choosePlant={choosePlant}
          setChoosePlant={(plant) =>
            setChoosePlant(plant === choosePlant ? null : plant)
          }
        />
        <Garden
          plants={plants}
          setPlant={handleSetPlant}
          deletePlant={handleDeletePlant}
        />
        <CoinBank coinBankVal={coinBankVal} />
        <Tools isGetGlove={isGetGlove} setIsGetGlove={setIsGetGlove} />
        <Sound />
      </div>
    </div>
  );
}
