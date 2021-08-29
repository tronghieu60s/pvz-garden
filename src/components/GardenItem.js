import React, { Fragment, memo, useEffect, useState } from "react";

export default memo(function GardenItem(props) {
  const { plant, setPlants } = props;
  const [plantStatus, setPlantStatus] = useState(0);
  const [timer, setTimer] = useState(plant.timer || 0);

  useEffect(() => setTimer(plant.timer), [plant]);
  useEffect(() => {
    if (timer < plant?.timer / 2 && plantStatus < 1) setPlantStatus(1);
    if (timer < 0 && plantStatus < 2) setPlantStatus(2);
    if (timer > 0) {
      const timerCount = setInterval(() => {
        setTimer(timer - 0.1);
      }, 100);
      return () => {
        clearInterval(timerCount);
      };
    }
  });

  return (
    <div className="gd-garden-item" onClick={setPlants}>
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plant[`image${plantStatus + 1}`]} />
          </div>
          <div className="gd-garden-item-timer">{timer?.toFixed(1)}</div>
        </Fragment>
      )}
    </div>
  );
});
