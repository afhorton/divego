import * as React from "react";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SliderContext } from "./contexts/sliderContext";
import { useState } from "react";

export default function MonthSlider() {
  const { sliderVal, setSliderVal } = useContext(SliderContext);
  const [ monthVal, setMonthVal ] = useState("")

  useEffect(() =>{
    switch (sliderVal) {
      case 1:
        setMonthVal("Jan")
        break;
      case 2:
        setMonthVal("Feb")
        break;
      case 3:
        setMonthVal("Mar")
        break;
      case 4:
        setMonthVal("Apr")
        break;
      case 5:
        setMonthVal("May")
        break;
      case 6:
        setMonthVal("Jun")
        break;
      case 7:
        setMonthVal("Jul")
        break;
      case 8:
        setMonthVal("Aug")
        break;
      case 9:
        setMonthVal("Sep")
        break;
      case 10:
        setMonthVal("Oct")
        break;
      case 11:
        setMonthVal("Nov")
        break;
      case 12:
        setMonthVal("Dec")
        break;
    }
  },[sliderVal])
  

  function valuetext(value) {

    useEffect(() => {
      value ? setSliderVal(value) : setSliderVal(sliderVal);
    }, [value]);
  }

  return (
    <Box
      sx={{
        width: "95%",
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <div><strong>{monthVal}</strong></div>
      <Slider
        sx={{
          color: "black",
        }}
        key={sliderVal}
        aria-label="Custom marks"
        defaultValue={sliderVal}
        getAriaValueText={valuetext}
        step={1}
        min={1}
        max={12}
        track={false}
      />
    </Box>
  );
}
