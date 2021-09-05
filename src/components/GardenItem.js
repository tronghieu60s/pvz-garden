import React, { Fragment, memo, useEffect, useState } from "react";
import { isEmptyObject } from "../helpers/commonFunctions";

export default memo(function GardenItem(props) {
  const { plant, choosePlant, setPlant, deletePlant } = props;

  const [timer, setTimer] = useState(plant.timer || 0);
  const [plantBlur, setPlantBlur] = useState(null);
  const [plantStatus, setPlantStatus] = useState(0);

  const statusPlant = () => {
    if (timer < plant?.timer / 2 && plantStatus < 1) {
      // time tree change to level 1
      setPlantStatus(1);
    }
    // the plant has grown and set over time
    if (timer < 0 && plantStatus < 2) {
      setPlantStatus(2);
      setTimer(plant.overTimer);
    }
  };

  useEffect(() => {
    statusPlant();
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
    setPlant(plant);
    setPlantStatus(0);
  };

  const styleOvertime = plantStatus === 2 ? " over-timer" : "";
  const imageSource = plant[`image${plantStatus}`];

  return (
    <div
      className="gd-garden-item"
      onClick={onClick}
      onMouseEnter={() => setPlantBlur(choosePlant?.image2)}
      onMouseLeave={() => setPlantBlur(null)}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={imageSource} />
            {plantStatus === 2 && (
              <img
                className="gd-garden-image-coin"
                src="./assets/images/inf/coin_gold_dollar.png"
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
});
