import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import "./googleMap.css";
import useSupercluster from "use-supercluster";
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
import Collapse from "@mui/material/Collapse";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import anchorClust from "../images/anchor3.png";
import { useMemo, useState, useContext, useEffect } from "react";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { JumpContext } from "./contexts/jumpContext";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { SliderContext } from "./contexts/sliderContext";
import { AnimalContext } from "./contexts/animalContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { dataParams } from "../helpers/mapHelpers";
import { setupClusters } from "../helpers/clusterHelpers";
import { diveSites } from "../axiosCalls/diveSiteAxiosCalls";
import { heatPoints } from "../axiosCalls/heatPointAxiosCalls";

const LIB = ["visualization", "places"];

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIB,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}

function Map() {
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { jump, setJump } = useContext(JumpContext);
  const { divesTog } = useContext(DiveSitesContext);
  const [boundaries, setBoundaries] = useState(null);
  const { animalVal } = useContext(AnimalContext);
  const { sliderVal } = useContext(SliderContext);
  const {showGeoCoder } = useContext(GeoCoderContext);

  const [newSites, setnewSites] = useState([]);
  const [heatpts, setHeatPts] = useState(formatHeatVals([]));
  const [mapRef, setMapRef] = useState(null);

  const [selected, setSelected] = useState(null);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let timoutHanlder;
  let timoutHandler;
  let GPSBubble;
  let filteredDiveSites;
  let filteredHeatPoints;

  function formatHeatVals(heatValues) {
    let newArr = [];
    heatValues &&
      heatValues.forEach((heatPoint) => {
        let newpt = {
          location: new google.maps.LatLng(heatPoint.lat, heatPoint.lng),
          weight: heatPoint.weight,
        };
        newArr.push(newpt);
      });
    return newArr;
  }

  const options = useMemo(() => ({
    mapTypeId: "satellite",
    clickableIcons: false,
    maxZoom: 14,
    minZoom: 4,
  }));

  const heatOpts = useMemo(() => ({
    opacity: 1,
    radius: 20,
  }));

  useEffect(async () => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);

    GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

    filteredDiveSites = await diveSites(GPSBubble);

    if (filteredDiveSites) {
      !divesTog ? setnewSites([]) : setnewSites(filteredDiveSites);
    }

    filteredHeatPoints = await heatPoints(GPSBubble, sliderVal, animalVal);
    setHeatPts(formatHeatVals(filteredHeatPoints));
  }, []);

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleMapCenterChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHanlder);
      timoutHanlder = window.setTimeout(function () {
        setMapCoords([mapRef.getCenter().lat(), mapRef.getCenter().lng()]);

        GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

        filteredDiveSites = diveSites(GPSBubble);
        Promise.all([filteredDiveSites])
          .then((response) => {
            !divesTog ? setnewSites([]) : setnewSites(response[0]);
          })
          .catch((error) => {
            console.log(error);
          });

        filteredHeatPoints = heatPoints(GPSBubble, sliderVal, animalVal);
        Promise.all([filteredHeatPoints])
          .then((response) => {
            setHeatPts(formatHeatVals(response[0]));
          })
          .catch((error) => {
            console.log(error);
          });
      }, 50);
    }
  };

  const handleMapZoomChange = async () => {
    if (mapRef) {
      setMapZoom(mapRef.getZoom());

      GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

      filteredDiveSites = await diveSites(GPSBubble);

      if (filteredDiveSites) {
        !divesTog ? setnewSites([]) : setnewSites(filteredDiveSites);
      }

      filteredHeatPoints = await heatPoints(GPSBubble, sliderVal, animalVal);
      setHeatPts(formatHeatVals(filteredHeatPoints));
    }
  };

  const handleBoundsChange = () => {
    if (mapRef) {
      window.clearTimeout(timoutHandler);
      timoutHandler = window.setTimeout(function () {
        let bnds = mapRef.getBounds();
        let lats = bnds[Object.keys(bnds)[0]];
        let lngs = bnds[Object.keys(bnds)[1]];
        setBoundaries([lngs.lo, lats.lo, lngs.hi, lats.hi]);

        GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

        filteredDiveSites = diveSites(GPSBubble);
        Promise.all([filteredDiveSites])
          .then((response) => {
            !divesTog ? setnewSites([]) : setnewSites(response[0]);
          })
          .catch((error) => {
            console.log(error);
          });

        filteredHeatPoints = heatPoints(GPSBubble, sliderVal, animalVal);
        Promise.all([filteredHeatPoints])
          .then((response) => {
            setHeatPts(formatHeatVals(response[0]));
          })
          .catch((error) => {
            console.log(error);
          });
      }, 50);
    }
  };

  useEffect(() => {
    if (jump) {
      mapRef.panTo(mapCoords);
      setJump(!jump);
    }
  }, [jump]);

  useEffect(async () => {
    GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

    filteredDiveSites = await diveSites(GPSBubble);

    if (filteredDiveSites) {
      !divesTog ? setnewSites([]) : setnewSites(filteredDiveSites);
    }

    filteredHeatPoints = await heatPoints(GPSBubble, sliderVal, animalVal);
    setHeatPts(formatHeatVals(filteredHeatPoints));
  }, [mapCoords, divesTog, sliderVal, animalVal]);

  const points = setupClusters(newSites);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: boundaries,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 12 },
  });

  const PlacesAutoComplete = ({ setSelected }) => {
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

      setMapCoords({
        lat,
        lng,
      });
      setJump(!jump);
    };

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className="combobox-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Go to..."
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

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={handleOnLoad}
      onCenterChanged={handleMapCenterChange}
      onZoomChanged={handleMapZoomChange}
      onBoundsChanged={handleBoundsChange}
    >
      <HeatmapLayer
        data={heatpts}
        options={heatOpts}
        opacity={1}
        radius={9}
      ></HeatmapLayer>

      <Collapse in={showGeoCoder} orientation="horizontal" collapsedSize="0px">
        <div className="places-container">
          <PlacesAutoComplete setSelected={setSelected} />
        </div>
      </Collapse>

      {clusters &&
        clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                position={{ lat: latitude, lng: longitude }}
                title={pointCount.toString() + " sites"}
                icon={anchorClust}
              >
                <div
                  style={{
                    width: `${10 + (pointCount / points.length) * 30}px`,
                    height: `${10 + (pointCount / points.length) * 30}px`,
                    backgroundColor: "lightblue",
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.siteID}
              position={{ lat: latitude, lng: longitude }}
              icon={anchorIcon}
              title={cluster.properties.siteID}
            ></Marker>
          );
        })}
    </GoogleMap>
  );
}
