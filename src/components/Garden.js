import React from "react";
import GardenItem from "./GardenItem";

export default function Garden(props) {
  const { plants } = props;
  return (
    <div className="gd-garden">
      {plants.map((plant, index) => (
        <GardenItem key={index} plant={plant} />
      ))}
    </div>
  );
}
