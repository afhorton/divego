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
    setAnimalVal(e.target.value);

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
    setAnimalVal("");
  };

  return (
    <div style={{ width: "100%", paddingRight: "2%" }}>
      <InputBase
        className="suggestInput"
        placeholder={placehodler}
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
          display: "flex",
          flexDirection: "column",
          height: "auto",
          zIndex: 10,
          position: "absolute",
          marginTop: "15px",
          marginLeft: "-4vw",
          // backgroundColor: "pink",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          width: "30vw",
        }}
      >
        {list.length > 0 &&
          list.map((animal) => {
            return (
              <AutoTopSuggestListItem
                key={animal}
                name={animal}
                animalVal={animalMultiSelection}
                setAnimalVal={setAnimalMultiSelection}
                setList={setList}
              />
            );
          })}
        {animalVal.length > 0 && list.length === 0 && (
          <div className="noAnimals">
            <p style={{ fontSize: 15, fontWeight: "bolder" }}>
              No Sea Creatures Found
            </p>
          </div>
        )}
        {animalVal.length > 0 && (
          <div className="menuButton" onClick={handleClear}>
            <h4>Close</h4>
          </div>
        )}

      <div className="tagContainer">
        {animalMultiSelection.length > 0 && (
           animalMultiSelection.map((animal) => {
                return (
                  <AnimalTag
                    key={animal}
                    animalMultiSelection={animalMultiSelection}
                    setAnimalMultiSelection={setAnimalMultiSelection}
                    animalName={animal}
                  />
                );
              })
        )}
       </div>

      </div>
    </div>
  );
}
