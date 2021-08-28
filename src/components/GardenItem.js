import React, { Fragment, useState, useRef, useEffect } from "react";

export default (props) => {
  const {
    plant,
    choosePlant,
    positionGardenItem,
    isSelectedPlant,
    coinBankVal,
    setCoinBankVal,
  } = props;

  const [plantItem, setPlantItem] = useState({
    image: null,
    purchasePrice: null,
    timer: null,
  });
  const [isPlanted, setIsPlanted] = useState(false); //check plant đã dc trồng hay chưa
  const chooseGardenItem = useRef(null);

  useEffect(() => {
    if (
      plantItem.purchasePrice !== null &&
      coinBankVal >= plantItem.purchasePrice
    ) {
      setCoinBankVal(coinBankVal - plantItem.purchasePrice);
    }
  }, [plantItem]);

  return (
    <div
      className="gd-garden-item"
      onClick={() => {
        if (!isSelectedPlant) {
          alert("Vui lòng chọn cây");
        } else {
          if (isPlanted) {
            alert("Cây đã được trồng, vui lòng chọn ô khác");
          } else {
            if (coinBankVal < choosePlant.purchasePrice) {
              alert("Không đủ tiền");
            } else {
              chooseGardenItem.current = positionGardenItem;
              setPlantItem({
                image1: choosePlant.image1,
                purchasePrice: choosePlant.purchasePrice,
                timer: choosePlant.timer,
              });
              setIsPlanted(true);
            }
          }
        }
      }}
    >
      {plant && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={plantItem.image1} />
          </div>
          <div className="gd-garden-item-timer">{plantItem.timer}</div>
        </Fragment>
      )}
    </div>
  );
};
