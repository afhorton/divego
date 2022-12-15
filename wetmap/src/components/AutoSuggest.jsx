import React from "react";
import { getAnimalNamesThatFit } from "../supabaseCalls/photoSupabaseCalls";
// import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import InputBase from "@mui/material/InputBase";
import AutoSuggestListItem from "./AutoSuggestListItem";
import "./autoSuggest.css";

export default function AnimalAutoSuggest(props) {
  const { setPin, pin, setList, list } = props;

  const handleChange = async (e) => {
    setPin({ ...pin, Animal: e.target.value });

    if (e.target.value.length > 0) {
      let fitleredListOfAnimals = await getAnimalNamesThatFit(e.target.value);
      let animalArray = [];
      fitleredListOfAnimals.forEach((animal) => {
        if (!animalArray.includes(animal.label)) {
          animalArray.push(animal.label);
        }
      });
      setList(animalArray);
    } else {
      setList([]);
    }
  };

  return (
    <div>
      <InputBase
        className="suggestInput"
        placeholder="Animal"
        name="Animal"
        value={pin.Animal}
        onChange={handleChange}
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "Indie Flower",
            textOverflow: "ellipsis",
            backgroundColor: "#33586A",
            height: "25px",
            color: "#F0EEEB",
            width: "auto",
            borderRadius: "5px"
          }}}
      ></InputBase>

      <div style={{ height: "auto", zIndex: 10, position: "absolute"}}>
        {list.length > 0 &&
          list.map((animal) => {
            return (
              <AutoSuggestListItem
                key={animal}
                name={animal}
                pin={pin}
                setPin={setPin}
                setList={setList}
              />
            );
          })}
      </div>
    </div>
  );
}
