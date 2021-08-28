import React, { Fragment, useState, useRef, useEffect } from "react";

export default (props) => {
  const { plant, choosePlant, positionGardenItem, isSelectedPlant } = props;
  const [plantItem, setPlantItem] = useState({
    image: null,
    purchasePrice: null,
    timer: null,
  });
  const [isPlanted, setIsPlanted] = useState(false);
  const chooseGardenItem = useRef(null);

  // useEffect(() => {
  //   setInterval(() => {
  //     //console.log(choosePlant.purchasePrice);
  //   }, 3000);
  // }, [choosePlant]);

  return (
    <div
      className="gd-garden-item"
      onClick={() => {
        if (!isSelectedPlant) alert("Vui lòng chọn cây");
        if (isPlanted) {
          alert("Cây đã được trồng, vui lòng chọn ô khác");
        } else {
          chooseGardenItem.current = positionGardenItem;
          setPlantItem({
            image2: choosePlant.image2,
            purchasePrice: choosePlant.purchasePrice,
            timer: choosePlant.timer,
          });
          setIsPlanted(true);
        }
      }}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plantItem.image2} />
          </div>
          <div className="gd-garden-item-timer">111</div>
        </Fragment>
      )}
    </div>
  );
};
