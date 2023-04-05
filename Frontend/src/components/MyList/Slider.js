import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

const marks = [
  {
    value: 2,
  },
  {
    value: 5,
  },
  {
    value: 8,
  },
  {
    value: 10,
  },
];

function valuetext(value) {
  return { value };
}

const DiscreteSliderMarks = ({ index, frating, setRating }) => {
  const handleChange = (event) => {
    const ratingvalue = event.target.value;

    setRating(ratingvalue);

    // const newarray = Array.from(frating);

    // newarray[index] = ratingvalue;

    // setRating((frating) => newarray);
  };

  return (
    <Box
      sx={{
        width: 280,
      }}
    >
      <Slider
        aria-label="Custom marks"
        defaultValue={5}
        getAriaValueText={valuetext}
        step={0.1}
        valueLabelDisplay="auto"
        max={10}
        value={frating}
        onChange={(event) => {
          handleChange(event);
        }}
      />
    </Box>
  );
};

export default React.memo(DiscreteSliderMarks);
