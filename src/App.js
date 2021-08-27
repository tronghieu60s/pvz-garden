import React from "react";
import Hello from "./components/Hello";
import background1 from './assets/images/background1.jpg';

export default function App() {
  return (
    <div>
      <Hello />
      <img src={background1} />
    </div>
  );
}
