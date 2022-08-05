import React from "react";

export default function Homeo(props) {
const { setShowAdminPortal, showAdminPortal } = props;

  return (
    <h2
      style={{
        fontFamily: "fantasy",
        marginBottom: "0",
        marginLeft: "0",
        backgroundColor: "white",
        borderRadius: "0px 10px 0px 0px",
      }}
      onDoubleClick={()=> setShowAdminPortal(!showAdminPortal)}
    >
      DiveGo
    </h2>
  );
}
