import * as React from "react";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SliderContext } from "./contexts/sliderContext";
import { useState } from "react";

export default function MonthSlider() {
  const { sliderVal, setSliderVal } = useContext(SliderContext);
  const [monthVal, setMonthVal] = useState("");

  useEffect(() => {
    switch (sliderVal) {
      case 1:
        setMonthVal("Jan");
        break;
      case 2:
        setMonthVal("Feb");
        break;
      case 3:
        setMonthVal("Mar");
        break;
      case 4:
        setMonthVal("Apr");
        break;
      case 5:
        setMonthVal("May");
        break;
      case 6:
        setMonthVal("Jun");
        break;
      case 7:
        setMonthVal("Jul");
        break;
      case 8:
        setMonthVal("Aug");
        break;
      case 9:
        setMonthVal("Sep");
        break;
      case 10:
        setMonthVal("Oct");
        break;
      case 11:
        setMonthVal("Nov");
        break;
      case 12:
        setMonthVal("Dec");
        break;
    }
  }, [sliderVal]);

  const valuetext = (event, value) => {
    setSliderVal(value);
  };

  return (
    <Box
      sx={{
        width: "95%",
        mx: "auto",
      }}
    >
      <div style={{ marginBottom: "-5px" }}>
        <strong>{monthVal}</strong>
      </div>
      <Slider
        sx={{
          color: "black",
          marginBottom: "-5px",
        }}
        aria-label="Custom marks"
        value={sliderVal}
        onChange={valuetext}
        step={1}
        min={1}
        max={12}
        track={false}
      />
    </Box>
  );
}
