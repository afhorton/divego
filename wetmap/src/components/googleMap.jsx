import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import "./googleMap.css";
import useSupercluster from "use-supercluster";
import "@reach/combobox/styles.css";
import Collapse from "@mui/material/Collapse";
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import anchorClust from "../images/anchor3.png";
import Manta from "../images/Manta32.png"
import whale from "../images/icons8-spouting-whale-36.png";
import { useMemo, useState, useContext, useEffect, useLayoutEffect } from "react";
import PlacesAutoComplete from "./PlacesAutocomplete";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { JumpContext } from "./contexts/jumpContext";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { SliderContext } from "./contexts/sliderContext";
import { AnimalContext } from "./contexts/animalContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { PinContext } from "./contexts/pinContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import { SelectedDiveSiteContext } from "./contexts/selectedDiveSiteContext";
import FormModal from "./modals/formModal";
import AnchorPics from "./modals/anchorPics";
import { newGPSBoundaries } from "../helpers/mapHelpers";
import { formatHeatVals } from "../helpers/heatPointHelpers";
import { setupClusters } from "../helpers/clusterHelpers";
// import { diveSites } from "../axiosCalls/diveSiteAxiosCalls";
import { diveSites } from "../supabaseCalls/diveSiteSupabaseCalls";
// import { heatPoints } from "../axiosCalls/heatPointAxiosCalls";
import { heatPoints } from "../supabaseCalls/heatPointSupabaseCalls";

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
  const { masterSwitch } = useContext(MasterContext);
  const { pin, setPin } = useContext(PinContext);
  const [pinRef, setPinRef] = useState(null);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { jump, setJump } = useContext(JumpContext);
  const { divesTog } = useContext(DiveSitesContext);
  const [boundaries, setBoundaries] = useState(null);
  const { animalVal } = useContext(AnimalContext);
  const { sliderVal } = useContext(SliderContext);
  const { showGeoCoder, setShowGeoCoder } = useContext(GeoCoderContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(SelectedDiveSiteContext)
  
  const [newSites, setnewSites] = useState([]);
  const [heatpts, setHeatPts] = useState(formatHeatVals([]));
  const [mapRef, setMapRef] = useState(null);

  const [selected, setSelected] = useState(null);
  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const [siteModal, setSiteModal] = useState(false);

  const toggleSiteModal = () => {
    setSiteModal(!siteModal);
  };

  let center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let mapCenterTimoutHandler;
  let mapBoundariesTimoutHandler;

  const options = useMemo(() => ({
    mapTypeId: "satellite",
    clickableIcons: false,
    maxZoom: 14,
    minZoom: 4,
    mapTypeControl: false,
    fullscreenControl: false,
  }));

  const heatOpts = useMemo(() => ({
    opacity: 1,
    radius: 20,
  }));

  const handleMapUpdates = async () => {
    let GPSBubble = newGPSBoundaries(mapZoom, mapCoords[0], mapCoords[1]);

    let filteredDiveSites = await diveSites(GPSBubble);
    !divesTog ? setnewSites([]) : setnewSites(filteredDiveSites);

    let filteredHeatPoints = await heatPoints(GPSBubble, sliderVal, animalVal);
    setHeatPts(formatHeatVals(filteredHeatPoints));
  };

  useLayoutEffect( () => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);
    handleMapUpdates();
  }, []);

  useEffect(() => {
    setDragPin({ lat: mapCoords[0], lng: mapCoords[1] });
  }, [masterSwitch]);

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleMapCenterChange = () => {
    if (mapRef) {
      window.clearTimeout(mapCenterTimoutHandler);
      mapCenterTimoutHandler = window.setTimeout(function () {
        setMapCoords([mapRef.getCenter().lat(), mapRef.getCenter().lng()]);
        handleMapUpdates();
      }, 50);
    }
  };

  const handleMapZoomChange = async () => {
    if (mapRef) {
      setMapZoom(mapRef.getZoom());
      handleMapUpdates();
    }
  };

  const handleBoundsChange = () => {
    if (mapRef) {
      window.clearTimeout(mapBoundariesTimoutHandler);
      mapBoundariesTimoutHandler = window.setTimeout(function () {
        let boundaries = mapRef.getBounds();
        let lats = boundaries[Object.keys(boundaries)[0]];
        let lngs = boundaries[Object.keys(boundaries)[1]];
        setBoundaries([lngs.lo, lats.lo, lngs.hi, lats.hi]);
        handleMapUpdates();
      }, 50);
    }
  };

  useEffect(() => {
    if (jump) {
      mapRef.panTo({ lat: mapCoords[0], lng: mapCoords[1] });
      setJump(!jump);
    }
  }, [jump]);

  useEffect(async () => {
    handleMapUpdates();
  }, [mapCoords, divesTog, sliderVal, animalVal]);

  const points = setupClusters(newSites);

  const { clusters } = useSupercluster({
    points,
    bounds: boundaries,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 12 },
  });

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

  const setupAnchorModal = (diveSiteName, lat, lng) => {

    setSelectedDiveSite({
      SiteName: diveSiteName,
      Latitude: lat,
      Longitude: lng,
    })
    setSiteModal(!siteModal)
  }

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
      {masterSwitch && (
        <HeatmapLayer
          data={heatpts}
          options={heatOpts}
          opacity={1}
          radius={9}
        ></HeatmapLayer>
      )}

      {masterSwitch && (
        <Collapse
          in={showGeoCoder}
          orientation="horizontal"
          collapsedSize="0px"
        >
          <div className="places-container">
            <PlacesAutoComplete setSelected={setSelected} />
          </div>
        </Collapse>
      )}

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
              onClick={() => setupAnchorModal(cluster.properties.siteID, latitude, longitude)}
            ></Marker>
          );
        })}

      {!masterSwitch && (
        <Marker
          position={dragPin}
          draggable={true}
          icon={Manta}
          onLoad={handlePinLoad}
          onDragEnd={handleDragEnd}
        ></Marker>
      )}

      <FormModal openup={siteModal} closeup={toggleSiteModal}>
        <AnchorPics closeup={toggleSiteModal} />
      </FormModal>
    </GoogleMap>
  );
}
