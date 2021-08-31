import React from "react";

export default function Sound() {
  return (
    <audio controls autoPlay loop style={{ display: "none" }}>
      <source src="../assets/sounds/soundtrack.mp3" type="audio/mp3"></source>
      Your browser does not support the audio element.
    </audio>
  );
}
