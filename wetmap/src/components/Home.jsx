import React from "react";
import "./logo.css";


export default function Homeo(props) {
  const { setShowAdminPortal, showAdminPortal } = props;

  return (
    <h2 className="text"
      onDoubleClick={() => setShowAdminPortal(!showAdminPortal)}
    >
      DiveGo
    </h2>
  );
}
