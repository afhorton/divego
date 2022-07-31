import * as React from "react";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SliderContext } from "./contexts/sliderContext";

const marks = [
  {
    value: 0,
    label: "Jan",
  },
  {
    value: 1,
    label: "Feb",
  },
  {
    value: 2,
    label: "Mar",
  },
  {
    value: 3,
    label: "Apr",
  },
  {
    value: 4,
    label: "May",
  },
  {
    value: 5,
    label: "Jun",
  },
  {
    value: 6,
    label: "Jul",
  },
  {
    value: 7,
    label: "Aug",
  },
  {
    value: 8,
    label: "Sep",
  },
  {
    value: 9,
    label: "Oct",
  },
  {
    value: 10,
    label: "Nov",
  },
  {
    value: 11,
    label: "Dec",
  },
];
export default function MonthSlider() {
  const { sliderVal, setSliderVal } = useContext(SliderContext);

  function valuetext(value) {

    useEffect(() => {
      value ? setSliderVal(value) : setSliderVal(sliderVal);
    }, [value]);
  }

  return (
    <Box
      sx={{
        width: "95%",
        mx: "auto",
      }}
    >
      <Slider
        sx={{
          color: "black",
        }}
        key={sliderVal}
        aria-label="Custom marks"
        defaultValue={sliderVal}
        getAriaValueText={valuetext}
        step={1}
        marks={marks}
        min={0}
        max={11}
        track={false}
      />
    </Box>
  );
}
