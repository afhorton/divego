import React from "react";
import "./histogram.css";

export default function AxisBar() {
  return (
    <div className="monthContainer" pointerEvents={'none'}>
      <div className="axisLine" pointerEvents={'none'}></div>
      <div className="months" pointerEvents={'none'}>
      <h1 className="letter">J</h1>
      <h1 className="letter">F</h1>
      <h1 className="letter">M</h1>
      <h1 className="letter">A</h1>
      <h1 className="letter">M</h1>
      <h1 className="letter">J</h1>
      <h1 className="letter">J</h1>
      <h1 className="letter">A</h1>
      <h1 className="letter">S</h1>
      <h1 className="letter">O</h1>
      <h1 className="letter">N</h1>
      <h1 className="letter">D</h1>
      </div>
    </div>
  );
}

