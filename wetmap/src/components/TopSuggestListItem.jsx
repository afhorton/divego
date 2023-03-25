import { useState } from "react";
import "./topSuggest.css";

const AutoTopSuggestListItem = (props) => {
  const { setList, setAnimalVal, animalVal, name } = props;

  const handleSelect = (name) => {

    if (animalVal.includes(name)){
      setAnimalVal(animalVal.filter(item => item !== name));
    } else {
      setAnimalVal([...animalVal, name]);
    }
  };

  console.log("getting", animalVal)


  return (
    <li id={name} className={animalVal.includes(name) ? "suggestItemMultiSelected" :"suggestItemMulti"} onClick={() => handleSelect(name)}>
      <div id="SuggestionBox">
        <div id="listItems">
          <strong>{name}</strong>
        </div>
      </div>
    </li>
  );
};

export default AutoTopSuggestListItem;
