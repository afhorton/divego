import React, { useContext } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { JumpContext } from "./contexts/jumpContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { CoordsContext } from "./contexts/mapCoordsContext";

const PlacesAutoComplete = ({ setSelected }) => {
  const { jump, setJump } = useContext(JumpContext);
  const { setShowGeoCoder } = useContext(GeoCoderContext);
  const { setMapCoords } = useContext(CoordsContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });

    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setMapCoords([lat, lng]);
    setValue("");
    setJump(!jump);
    setShowGeoCoder(!setShowGeoCoder);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        className="combobox-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Go to..."
        style={{marginTop: "15px", marginLeft: "2px"}}
      />
      <ComboboxPopover className="popover">
        <ComboboxList className="poplist">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="popopt"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutoComplete;
