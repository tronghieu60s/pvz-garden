import React, { Fragment, useState, useRef } from "react";

export default (props) => {
  const { plant, choosePlant, positionGardenItem, isSelectedPlant } = props;
  const [plantItem, setPlantItem] = useState({
    image: null,
    point: null,
  });
  const chooseGardenItem = useRef(null);

  return (
    <div
      className="gd-garden-item"
      onClick={() => {
        if (!isSelectedPlant) alert("Vui lòng chọn câyyyyyyyyyyyyyyyyyyyyyy");
        chooseGardenItem.current = positionGardenItem;
        setPlantItem({
          image2: choosePlant.image2,
          point: choosePlant.point,
        });
      }}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plantItem.image2} />
          </div>
          <div className="gd-garden-item-timer">{plantItem.point}</div>
        </Fragment>
      )}
    </div>
  );
};
