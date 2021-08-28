import React, { Fragment } from "react";

export default function GardenItem(props) {
  const { image } = props;

  return (
    <div className="gd-garden-item">
      {image && (
        <Fragment>
          <div className="gd-garden-image">
            <img src={image} />
          </div>
          <div className="gd-garden-item-timer">50</div>
        </Fragment>
      )}
    </div>
  );
}
