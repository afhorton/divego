import { useState } from "react";
import "./topSuggest.css";

const AutoTopSuggestListItem = (props) => {
  const { setList, setAnimalVal, animalVal, name } = props;

  const handleSelect = (name) => {
    setAnimalVal(name)
    setList([]);
  };

  return (
    <li id={name} className="suggestItem" onClick={() => handleSelect(name)}>
      <div id="SuggestionBox">
        <div id="listItems">
          <strong>{name}</strong>
        </div>
      </div>
    </li>
  );
};

export default AutoTopSuggestListItem;
