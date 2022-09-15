import { useState } from 'react'
import "./autoSuggest.css";

const AutoSuggestListItem = (props) => {

    const { setList, setPin, pin, name, key } = props

    const handleSelect = (name) => {
        setPin({...pin, Animal: name})
        setList([])
      };

    return (
        <li id={name} className='suggestItem'onClick={() => handleSelect(name)} >
            <div id='SuggestionBox' >
            <div id='listItems' ><strong>{name}</strong></div> 
            </div>
        </li>
    )
} 

export default AutoSuggestListItem;