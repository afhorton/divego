import { useContext } from "react";
import { AnimalContext } from "./contexts/animalContext";
import { photos } from "./data/testdata";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function AnimalSearcher() {

const { setAnimalVal } = useContext(AnimalContext);
  
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={photos}
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
