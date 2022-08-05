import { useState, useContext } from "react";
import { AnimalContext } from "./contexts/animalContext";
import { useEffect } from "react";
import { photos } from "./data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAnimalNames } from "../axiosCalls/photoAxiosCalls"

export default function AnimalSearcher() {

const { setAnimalVal } = useContext(AnimalContext);
const [list, setList] = useState([])
let animalData;

useEffect(() => {

animalData = getAnimalNames()
Promise.all([animalData])
.then((response) => {
  setList(response[0])
})
.catch((error) => {
  console.log(error);
});

}, [])
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list} //animalnames
      onChange={(event, value) => {
          if(!value) {setAnimalVal("None")
            } else { setAnimalVal(value.label)
            }}}
      sx={{
        "&.Mui-selected": { opacity:"80%" },
        "&.Mui-selected:hover": { opacity:"80%" },
        "&:hover": { opacity:"80%" },
        width: 230,
        backgroundColor: "white",
        opacity: "70%",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingTop: "2px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Spiecies"
          variant="standard"
          sx={{ paddingLeft: "0px" }}
        />
      )}
    ></Autocomplete>
  );
}
