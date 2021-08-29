import React, { useState, useEffect } from "react";
import CoinBank from "./components/CoinBank";
import Garden from "./components/Garden";
import Glove from "./components/Glove";
import SendBack from "./components/SendBank";
import plants from "./constants/plants";
import { objectToArray, isEmptyObject } from "./helpers/commonFunctions";

const plantsList = objectToArray(plants);

export default function App() {
  const [coinBankVal, setCoinBankVal] = useState(1000); //money
  const [plants, setPlants] = useState([...Array(45).fill({})]);
  const [choosePlant, setChoosePlant] = useState(null);

  useEffect(() => {
    // block dragging of images
    window.ondragstart = () => false;
  }, []);

  const handleSetPlants = (index) => {
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

  return (
    <div className="gd-container">
      <div className="gd-container-game">
        <SendBack
          plants={plantsList}
          choosePlant={choosePlant}
          setChoosePlant={setChoosePlant}
        />
        <Garden plants={plants} setPlants={handleSetPlants} />
        <CoinBank coinBankVal={coinBankVal} />
        <Glove />
      </div>
    </div>
  );
}
