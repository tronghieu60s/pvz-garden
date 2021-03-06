import React, { Fragment, useEffect, useState } from "react";
import { isEmptyObject } from "../../helpers/commonFunctions";
import { PATH_INF } from "../../constants/config";

export default function GardenItem(props) {
  const {
    plant,
    toolSelected,
    setToolSelected,
    choosePlant,
    setPlant,
    deletePlant,
    harvestPlant,
  } = props;

  const [plantBlur, setPlantBlur] = useState(null); // for blur effect
  const [plantNeed, setPlantNeed] = useState(null); // need water-can, need tree-food, need phonograph

  const [timer, setTimer] = useState(props.plant.timer || 0); // timer for plant
  const [plantHarvest, setPlantHarvest] = useState(0); // plant harvest
  const [plantStatus, setPlantStatus] = useState(0); // 0: plant, 1: harvest, 2: ready dead

  const onPlantHarvest = () => {
    setTimer(plant.timer / 2);
    setPlantStatus(1);

    const newPlantHarvest = plantHarvest + 1;
    if (newPlantHarvest >= 3) {
      deletePlant();
      setPlantStatus(0);
      setPlantHarvest(0);
      setPlantNeed(null);
      return;
    }
    setPlantNeed(null);
    setPlantHarvest(newPlantHarvest);
  };

  const onPlantStatus = () => {
    if (timer < plant?.timer / 2 && plantStatus < 1) {
      // time tree change to level 1
      setPlantStatus(1);
    }

    // the plant has grown and set over time
    if (timer < 0 && plantStatus < 2) {
      setPlantStatus(2);
      setTimer(plant.overTimer);
    }

    // plant status === 2 => did over time
    if (timer < 0 && plantStatus === 2) {
      onPlantHarvest();
    }
  };

  const onPlantNeed = (value) => {
    if (
      plantNeed ||
      isEmptyObject(plant) ||
      timer > plant.timer / 2 ||
      plantStatus >= 2
    ) {
      return;
    }

    setPlantNeed(value);
    setPlantStatus(2);
    setTimer(plant.overTimer);
  };

  useEffect(() => {
    const timerNeed = setInterval(() => {
      const rdTotalPercent = Math.floor(Math.random() * 100);
      if (rdTotalPercent < 90) {
        return;
      }

      const rdPercent = Math.floor(Math.random() * 100);

      // 1% chance to change plant need
      if (rdPercent === 25) {
        onPlantNeed("watering-can");
      }

      // 1% chance to change plant need
      if (rdPercent === 50) {
        onPlantNeed("tree-food");
      }

      // 1% chance to change plant need
      if (rdPercent === 75) {
        onPlantNeed("phonograph");
      }
    }, 100);
    return () => {
      clearInterval(timerNeed);
    };
  });

  useEffect(() => {
    onPlantStatus();
    // set timer count down
    if (timer > 0) {
      const timerCount = setInterval(
        () => {
          setTimer(timer - 0.1);
        },
        plantNeed ? 50 : 100
      );

      return () => {
        clearInterval(timerCount);
      };
    }
  });

  useEffect(() => setTimer(plant.timer), [plant]);

  const onClick = () => {
    if (toolSelected === "") {
      setPlant();
    } else if (toolSelected === "glove") {
      if (plantStatus >= 2) {
        harvestPlant(plantNeed ? plant.salePrice / 2 : plant.salePrice);
        onPlantHarvest();
      } else {
        new Audio("./assets/sounds/pause.ogg").play();
      }
    } else if (toolSelected === "shovel") {
      deletePlant();
      setPlantNeed(null);
      setPlantStatus(0);
      setPlantHarvest(0);
      new Audio("./assets/sounds/plant.ogg").play();
    } else if (toolSelected === plantNeed) {
      setPlantNeed(null);
      setPlantStatus(1);
      setTimer(plant.overTimer * 2);
      new Audio(`./assets/sounds/${plantNeed}.ogg`).play();
    } else {
      new Audio("./assets/sounds/pause.ogg").play();
    }

    setToolSelected("");
  };

  const styleOvertime = plantStatus === 2 ? " over-timer" : "";
  const imageSource = plant[`image${plantStatus}`];

  return (
    <div
      className="gd-garden-item"
      onClick={onClick}
      onMouseEnter={() => setPlantBlur(choosePlant?.image1)}
      onMouseLeave={() => setPlantBlur(null)}
    >
      {plant && (
        <Fragment>
          <div
            className="gd-garden-image"
            style={{ width: `${plant?.imageSize}px` }}
          >
            <img src={imageSource} />
            {plantNeed && (
              <img
                src={`${PATH_INF}${plantNeed}.png`}
                className="gd-garden-image-need"
              />
            )}
            {plantStatus === 2 && (
              <img
                className="gd-garden-image-coin"
                src="./assets/images/inf/coin_silver_dollar.png"
              />
            )}
            {isEmptyObject(plant) && (
              <img className="gd-garden-image-blur" src={plantBlur} />
            )}
          </div>
          <div className={`gd-garden-item-timer${styleOvertime}`}>
            {timer?.toFixed(1)}
          </div>
        </Fragment>
      )}
    </div>
  );
}
