import React from "react";
import { getAnimalNamesThatFit } from "../axiosCalls/photoAxiosCalls";
import { Input } from "reactstrap";
import AutoSuggestListItem from "./AutoSuggestListItem";
import "./autoSuggest.css";

export default function AnimalAutoSuggest(props) {
  const { setPin, pin, setList, list } = props;
  
  const handleChange = async (e) => {
    setPin({ ...pin, Animal: e.target.value });

    if (e.target.value.length > 0) {
      let fitleredListOfAnimals = await getAnimalNamesThatFit(e.target.value);
      setList(fitleredListOfAnimals);
    } else {
      setList([]);
    }
  };

  return (
    <div>
      <Input
        className="suggestInput"
        placeholder="Animal"
        name="Animal"
        value={pin.Animal}
        onChange={handleChange}
      ></Input>

      <div style={{ height: "auto", zIndex: 10, position: "absolute" }}>
        {list.length > 0 &&
          list.map((animal) => {
            return (
              <AutoSuggestListItem
                key={animal.label}
                name={animal.label}
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
