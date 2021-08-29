import React, { Fragment } from "react";

export default function GardenItem(props) {
  const { plant, setPlants } = props;
  // const [timer, setTimer] = useState(plantItem.timer || 0);

  // useEffect(() => {
  //   if (timer) {
  //     const timerCount = setInterval(() => {
  //       setTimer(timer - 1);
  //     }, 1000);
  //     return () => {
  //       clearInterval(timerCount);
  //     };
  //   }
  // });

  // useEffect(() => {
  //   setTimer(plantItem.timer);
  // }, [plantItem]);

  return (
    <div className="gd-garden-item" onClick={setPlants}>
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plant.image1} />
          </div>
          <div className="gd-garden-item-timer">{""}</div>
        </Fragment>
      )}
    </div>
  );
}
