import * as React from "react";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SliderContext } from "./contexts/sliderContext";

const marks = [
  {
    value: 1,
    label: "Jan",
  },
  {
    value: 2,
    label: "Feb",
  },
  {
    value: 3,
    label: "Mar",
  },
  {
    value: 4,
    label: "Apr",
  },
  {
    value: 5,
    label: "May",
  },
  {
    value: 6,
    label: "Jun",
  },
  {
    value: 7,
    label: "Jul",
  },
  {
    value: 8,
    label: "Aug",
  },
  {
    value: 9,
    label: "Sep",
  },
  {
    value: 10,
    label: "Oct",
  },
  {
    value: 11,
    label: "Nov",
  },
  {
    value: 12,
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
        min={1}
        max={12}
        track={false}
      />
    </Box>
  );
}
