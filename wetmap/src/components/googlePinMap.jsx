import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./googleMap.css";
import useSupercluster from "use-supercluster";
import { diveSitesFake } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import anchorClust from "../images/anchor3.png";
import whale from "../images/icons8-spouting-whale-36.png";
import { useMemo, useState, useContext, useEffect } from "react";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { PinContext } from "./contexts/pinContext";
import { setupMapValues, dataParams } from "../helpers/mapHelpers";
import { setupClusters } from "../helpers/clusterHelpers";
import { diveSites } from "../axiosCalls/diveSiteAxiosCalls";

export default function PinHome() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <PinMap></PinMap>;
}

function PinMap() {
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { pin, setPin } = useContext(PinContext);
  const [boundaries, setBoundaries] = useState(null);

  const [newSites, setnewSites] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [pinRef, setPinRef] = useState(null);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  const pinCenter = useMemo(
    () => ({ lat: mapCoords[0], lng: mapCoords[1] }),
    []
  );

  let timoutHanlder;
  let timoutHandler;
  let DiveSiteAndHeatSpotValue;
  let GPSBubble;
  let filteredDiveSites;

  const options = useMemo(() => ({
    mapTypeId: "satellite",
    clickableIcons: false,
    maxZoom: 14,
    minZoom: 4,
  }));

  useEffect(() => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);

    GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

    filteredDiveSites = diveSites(GPSBubble);
    Promise.all([filteredDiveSites])
      .then((response) => {
        setnewSites(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    DiveSiteAndHeatSpotValue = setupMapValues(
      mapZoom,
      mapCoords[0],
      mapCoords[1],
      diveSitesFake
    );

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
            setnewSites(response[0]);
          })
          .catch((error) => {
            console.log(error);
          });

        DiveSiteAndHeatSpotValue = setupMapValues(
          mapZoom,
          mapCoords[0],
          mapCoords[1],
          diveSitesFake
        );

      }, 50);
    }
  };

  const handleMapZoomChange = () => {
    if (mapRef) {
      setMapZoom(mapRef.getZoom());

      GPSBubble = dataParams(mapZoom, mapCoords[0], mapCoords[1]);

      filteredDiveSites = diveSites(GPSBubble);
      Promise.all([filteredDiveSites])
        .then((response) => {
          setnewSites(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      DiveSiteAndHeatSpotValue = setupMapValues(
        mapZoom,
        mapCoords[0],
        mapCoords[1],
        diveSitesFake
      );

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
            setnewSites(response[0]);
          })
          .catch((error) => {
            console.log(error);
          });

        DiveSiteAndHeatSpotValue = setupMapValues(
          mapZoom,
          mapCoords[0],
          mapCoords[1],
          diveSitesFake
        );

      }, 50);
    }
  };

  const handlePinLoad = (marker) => {
    setPinRef(marker);
  };

  const handleDragEnd = () => {
    if (pinRef) {
      setPin({
        ...pin,
        Latitude: pinRef.getPosition().lat(),
        Longitude: pinRef.getPosition().lng(),
      });
    }
  };

  const points = setupClusters(newSites);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: boundaries,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 12 },
  });

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
      {clusters.map((cluster) => {
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

      <Marker
        position={pinCenter}
        draggable={true}
        icon={whale}
        onLoad={handlePinLoad}
        onDragEnd={handleDragEnd}
      ></Marker>
    </GoogleMap>
  );
}
