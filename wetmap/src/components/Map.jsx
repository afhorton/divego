import React, { useState, useEffect, useCallback, useMemo, useContext, Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { diveSites, heatVals } from "./data/testdata";
import anchor from "../images/anchor7.png";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import L from "leaflet";
import {dataParams, filterSites} from '../helpers/mapHelpers'
import { CoordsContext } from './contexts/mapCoordsContext'
import { ZoomContext } from './contexts/mapZoomContext'

const center = [49.246292, -123.116226]
const zoom = 7
let timoutHanlder;
let newParams;
let sites;

function DisplayPosition({map, resetData}) {

  const [position, setPosition] = useState(() => map.getCenter())
  const [zoomlev, setZoomlev] = useState(() => map.getZoom())

  const { setMapCoords } = useContext(CoordsContext)
  const { setMapZoom } = useContext(ZoomContext)

  const onMove = useCallback(() => {
    window.clearTimeout(timoutHanlder)
    timoutHanlder = window.setTimeout(function(){
      setPosition(map.getCenter()) 
      setZoomlev(map.getZoom())
    },50)
    },
    [map],
  )
  const [newSites, setnewSites] = useState(diveSites)


  useEffect(() => {
    newParams = dataParams(zoomlev, position.lat, position.lng)
    sites = setnewSites(filterSites(newParams, diveSites))
    setMapCoords([position.lat, position.lng])
    setMapZoom(zoomlev)
    resetData(newSites)
    
    return () => {

    }
  }, [position, zoomlev])

  useEffect(() => {
      map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return(<Fragment></Fragment>)
}

 function ExtState({ searchParams }) {
  const [map , setMap] = useState(null);
  const [dataSet, setDataSet] = useState(null)

  let anchorIcon = L.icon({
    iconUrl: anchor,
    iconRetinaUrl: anchor,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [25, 25],
  });

  const gradient1 = { 0.2: "blue", 0.4: "green", 0.6: "yellow", 0.8: "orange", 1: "red"};

  const displayMap = useMemo(() => (
  
  <MapContainer
    center={center}
    zoom={zoom}
    scrollWheelZoom={true}
    minZoom={4}
    maxZoom={14}
    ref={setMap}
  >
    <HeatmapLayer
      fitBoundsOnLoad
      fitBoundsOnUpdate
      points={heatVals}
      longitudeExtractor={(m) => m[1]}
      latitudeExtractor={(m) => m[0]}
      intensityExtractor={(m) => parseFloat(m[2])}
      radius={10}
      max={1}
      minOpacity={1}
      gradient={gradient1}
    />
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />


    {dataSet &&
      dataSet.map((dataLoc) => (
        <Marker
          key={dataLoc.name}
          position={[dataLoc.lat, dataLoc.lng]}
          icon={anchorIcon}
        >
          <Popup>
            {dataLoc.name}
          </Popup>
        </Marker>
      ))}
      
  </MapContainer>), [dataSet])
  
  return (
    <div className="map-container">
      {map ? <DisplayPosition map={map} resetData={setDataSet}/> : null}
      {displayMap}
    </div>
  );
}

export default function () {
  return (
    <ExtState />
  )
}
