import { useState, useContext } from "react";
import { AnimalContext } from "../contexts/animalContext";
import { useEffect } from "react";
import { photos } from "../data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getAnimalNames } from "../../axiosCalls/photoAxiosCalls"
import { PinContext } from "../contexts/pinContext";

export default function AnimalSearchForModal() {

const { pin, setPin } = useContext(PinContext);
const [list, setList] = useState([])
const [listAdd, setListAdd] = useState('')
const [listLength, setListLength] = useState(0)
let animalData;
let arrayLength;

useEffect(() => {

animalData = getAnimalNames()
Promise.all([animalData])
.then((response) => {
  setList(response[0])
  setListLength(response[0].length)
})
.catch((error) => {
  console.log(error);
});

}, [])


const handleChange = (e) => {
  setListAdd({label: e.target.value})
  let newArrayLength = list.length
  console.log(newArrayLength, listLength)
  if (newArrayLength > listLength){
    list.pop()
  }
 
  setList([...list, listAdd])
  console.log("i am", list)
}

function manage(value){
  setPin({...pin, Animal: value})
  list.pop()
  
}

console.log("hmm", list)
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list} //animalnames
      onChange={(event, value) => {
          if(!value) {listAdd ? setPin({...pin, Animal: listAdd}) : setPin({...pin, Animal: ""})
            } else {manage(value.label)
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
        fontFamily: 'IndieFlower'
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Animal"
          variant="standard"
          sx={{ paddingLeft: "0px", fontFamily: 'IndieFlower' }}
          onChange={handleChange}
          value={listAdd}
        />
      )}
    >}</Autocomplete>
  );
}
