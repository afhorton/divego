import React, { useState, useContext } from "react";
import { Form } from "reactstrap";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { JumpContext } from "./contexts/jumpContext";

export default function GeoCoder() {
  const { setMapCoords } = useContext(CoordsContext);
  const { jump, setJump } = useContext(JumpContext);
  const [formVal, setFormVal] = useState("");

  const handleChange = (e) => {
    setFormVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      key: import.meta.env.VITE_MapQuest_API_KEY,
      location: formVal,
    };

    axios
      .get(`https://www.mapquestapi.com/geocoding/v1/address?`, { params })
      .then((response) => {
        setMapCoords({
          lat: response.data.results[0].locations[0].latLng.lat,
          lng: response.data.results[0].locations[0].latLng.lng,
        });
        setJump(!jump);
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  };

  return (
    <div
      style={{
        "&.selected" : {opacity: "80%"},
        "&.selected:hover" : {opacity: "80%"},
        "&:hover" : {opacity: "80%"},
        backgroundColor: "white",
        width: "240px",
        opacity: "70%",
        borderRadius: "10px",
        paddingTop: "2px",
      }}
    >
      <Form onSubmit={handleSubmit} style={{ width: "240px" }}>
        <TextField
          id="standard-basic"
          label="Go to..."
          variant="standard"
          onChange={handleChange}
          value={formVal}
          sx={{
            "&.Mui-selected": { opacity: "80%" },
            "&.Mui-selected:hover": { opacity: "80%" },
            "&:hover": { opacity: "80%" },
            height: "auto",
            width: "230px",
            backgroundColor: "white",
            opacity: "70%",
            borderRadius: "10px",
            marginLeft: "10px",
          }}
        />
      </Form>
    </div>
  );
}
