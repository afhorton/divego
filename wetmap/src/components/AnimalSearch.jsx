import { useState, useContext } from "react";
import { AnimalContext } from "./contexts/animalContext";
import { useEffect } from "react";
import { photos } from "./data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAnimalNames } from "../axiosCalls/photoAxiosCalls"
import { AnimalRevealContext } from "./contexts/animalRevealContext";

export default function AnimalSearcher() {

const { showAnimalSearch, setShowAnimalSearch } = useContext(AnimalRevealContext);
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
          if(!value) {
            setAnimalVal("All")
            setShowAnimalSearch(!setShowAnimalSearch)
            } else { 
              setAnimalVal(value.label)
              setShowAnimalSearch(!setShowAnimalSearch)
            }}}
      sx={{
        "&.Mui-selected": { opacity:"80%" },
        "&.Mui-selected:hover": { opacity:"80%" },
        "&:hover": { opacity:"80%" },
        width: 222,
        height: 40,
        backgroundColor: "white",
        opacity: "70%",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "5px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Species"
          variant="standard"
          sx={{ paddingLeft: "0px" }}
        />
      )}
    ></Autocomplete>
  );
}
