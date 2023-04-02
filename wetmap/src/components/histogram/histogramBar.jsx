import React from "react";
import "./histogram.css";

let heightVal
export default function DataBar(props) {

  const { moddedVal } = props;

  console.log("values", moddedVal)

  heightVal = moddedVal
  return (
    <div className="barContainer" style={{height: moddedVal + "%"}} pointerEvents={'none'}>
    </div>
  );
}

