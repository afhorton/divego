import React, { useState, useEffect, useCallback, useMemo, useContext, useRef, Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { diveSites } from "./data/testdata";
import whale from "../images/icons8-spouting-whale-96.png"
import anchor from "../images/anchor6.png";
import L from "leaflet";
import {dataParams, filterSites} from '../helpers/mapHelpers'
import { CoordsContext } from './contexts/mapCoordsContext'
import { ZoomContext } from './contexts/mapZoomContext'
import { PinContext } from './contexts/pinContext'

let timoutHanlder;
let newParams;
let sites;

function DraggableMarker() {

  const { mapCoords } = useContext(CoordsContext)
  const { mapZoom } = useContext(ZoomContext)

  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState(mapCoords)

  const { pin, setPin } = useContext(PinContext)
  
  useEffect(() => {
    setPin({...pin, Latitude: position.lat, Longitude: position.lng})
  }, [position])

  console.log("pin is at:" , position)


  let whaleIcon = L.icon({
    iconUrl: whale,
    iconRetinaUrl: whale,
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
    iconSize: [25, 25],
  });

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={whaleIcon}>
      <Popup minWidth={90}>
        <p>
        Pin is at: {position.lat}, {position.lng}
        </p>
      </Popup>
    </Marker>
  )
}

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

  const { mapCoords } = useContext(CoordsContext)
  const { mapZoom } = useContext(ZoomContext)


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
    center={mapCoords}
    zoom={mapZoom}
    scrollWheelZoom={true}
    minZoom={4}
    maxZoom={14}
    ref={setMap}
  >
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
      <DraggableMarker/>
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
