import React, { useState, useContext, useEffect } from "react";
import { getAnimalNamesThatFit } from "../supabaseCalls/photoSupabaseCalls";
// import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import { getAnimalMultiSelect } from "../supabaseCalls/photoSupabaseCalls";
import InputBase from "@mui/material/InputBase";
import AutoTopSuggestListItem from "./TopSuggestListItem";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";
import { AnimalContext } from "../components/contexts/animalContext";
import AnimalTag from "./AnimalTags";
import "./topSuggest.css";

export default function AnimalTopAutoSuggest(props) {
  // const { setPin, pin, setList, list } = props;

  const { animalVal, setAnimalVal } = useContext(AnimalContext);
  const [list, setList] = useState([]);

  const [placehodler, setPlacehodler] = useState("Select Sea Creatures");

  const { animalMultiSelection, setAnimalMultiSelection } = useContext(
    AnimalMultiSelectContext
  );

  useEffect(() => {
    if (animalMultiSelection.length > 0) {
      setPlacehodler(
        "Selected (" + animalMultiSelection.length.toString() + ") Creatures"
      );
    } else {
      setPlacehodler("Select Sea Creatures");
    }
  }, [animalMultiSelection]);

  const handleChange = async (e) => {
    // setAnimalVal(e.target.value);

    if (e.target.value.length > 0) {
      let fitleredListOfAnimals = await getAnimalMultiSelect(e.target.value);
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

  const handleClear = () => {
    if (animalMultiSelection.length > 0) {
      setPlacehodler(
        "Selected (" + animalMultiSelection.length.toString() + ") Creatures"
      );
    } else {
      setPlacehodler("Select Sea Creatures");
    }
    setList([]);
    // setAnimalVal("");
  };

  return (
      <div className="tagContainer">
        {animalVal.length > 0 && (
           animalVal.map((animal) => {
                return (
                  <AnimalTag
                    key={animal}
                    animalMultiSelection={animalVal}
                    setAnimalMultiSelection={setAnimalVal}
                    animalName={animal}
                  />
                );
              })
        )}
       </div>

  );
}
