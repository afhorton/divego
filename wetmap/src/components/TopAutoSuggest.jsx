import React, { useState, useContext } from "react";
import { getAnimalNamesThatFit } from "../supabaseCalls/photoSupabaseCalls";
// import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import InputBase from "@mui/material/InputBase";
import AutoTopSuggestListItem from "./TopSuggestListItem";
import { AnimalContext } from "../components/contexts/animalContext";
import "./topSuggest.css";
import { borderColor } from "@mui/system";

export default function AnimalTopAutoSuggest(props) {
  // const { setPin, pin, setList, list } = props;

  const { animalVal, setAnimalVal } = useContext(AnimalContext);
  const [list, setList] = useState([]);

  const handleChange = async (e) => {
    setAnimalVal(e.target.value);
    // setPin({ ...pin, Animal: e.target.value });

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
    <div style={{ width: "100%", paddingRight: "2%" }}>
      <InputBase
        className="suggestInput"
        placeholder="All the fish in the sea"
        name="Animal"
        value={animalVal}
        onChange={handleChange}
        inputProps={{
          style: {
            textAlign: "center",
            fontFamily: "Indie Flower",
            fontWeight: "bolder",
            textOverflow: "ellipsis",
            backgroundColor: "#33586A",
            height: "15px",
            paddingTop: "6px",
            paddingBottom: "4px",
            color: "#FFFFFF",
            width: "100%",
            borderRadius: "10px",
            borderColor: "grey",
            border: "0.5px solid grey",
          },
        }}
      ></InputBase>

      <div
        style={{
          height: "auto",
          zIndex: 10,
          position: "absolute",
          marginTop: "15px",
          width: "100%",
        }}
      >
        {list.length > 0 &&
          list.map((animal) => {
            return (
              <AutoTopSuggestListItem
                key={animal}
                name={animal}
                animalVal={animalVal}
                setAnimalVal={setAnimalVal}
                setList={setList}
              />
            );
          })}
      </div>
    </div>
  );
}
