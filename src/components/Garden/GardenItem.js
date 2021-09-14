import React, { Fragment, memo, useEffect, useState } from "react";
import { isEmptyObject } from "../../helpers/commonFunctions";

export default function GardenItem(props) {
  const {
    plant,
    isGetGlove,
    setIsGetGlove,
    isGetShovel,
    setIsGetShovel,
    choosePlant,
    setPlant,
    deletePlant,
    harvestPlant,
  } = props;

  const [timer, setTimer] = useState(props.plant.timer || 0);
  const [plantHarvest, setPlantHarvest] = useState(0);
  const [plantBlur, setPlantBlur] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0);

  const plantHarvestHandler = () => {
    setTimer(plant.timer / 2);
    setPlantStatus(1);

    const newPlantHarvest = plantHarvest + 1;
    if (newPlantHarvest >= 3) {
      deletePlant();
    }
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
      plantHarvestHandler();
    }
  };

  useEffect(() => {
    onPlantStatus();
    // set timer count down
    if (timer > 0) {
      const timerCount = setInterval(() => {
        setTimer(timer - 0.1);
      }, 100);
      return () => {
        clearInterval(timerCount);
      };
    }
  });
  useEffect(() => setTimer(plant.timer), [plant]);

  const onClick = () => {
    if (isGetShovel) {
      deletePlant();
      setPlantStatus(0);
      setIsGetShovel(!isGetShovel);
      return;
    }

    if (plantStatus >= 2 && isGetGlove) {
      harvestPlant();
      plantHarvestHandler();
      setIsGetGlove(!isGetGlove);
      return; 
    }

    setPlant();
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
