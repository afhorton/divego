import { SelectedDiveSiteContext } from "./contexts/selectedDiveSiteContext";
import { SliderContext } from "./contexts/sliderContext";
import { AnimalContext } from "./contexts/animalContext";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";
import { useState, useContext, useEffect } from "react";
import { siteGPSBoundaries } from "../helpers/mapHelpers";
import { picClickheatPoints, multiHeatPoints } from "../supabaseCalls/heatPointSupabaseCalls";
import {
  getPhotosforAnchor,
  getPhotosforAnchorMulti,
  getPhotosforMapArea,
} from "../supabaseCalls/photoSupabaseCalls";
import { MapBoundsContext } from "./contexts/mapBoundariesContext";
import { HeatPointsContext } from "./contexts/heatPointsContext";
// import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
import "photoswipe/dist/photoswipe.css";
import FlagIcon from "@mui/icons-material/Flag";
import { Gallery, Item } from "react-photoswipe-gallery";
import { formatHeatVals } from "../helpers/heatPointHelpers";
import "./photoMenu.css";
import  PhotoMenuListItem from "./photoMenuListItem";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const PhotoMenu = (props) => {
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { sliderVal } = useContext(SliderContext);
  const { animalVal, setAnimalVal } = useContext(AnimalContext);
  const { animalMultiSelection } = useContext(AnimalMultiSelectContext);
  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const [monthVal, setMonthVal] = useState("");
  const [areaPics, setAreaPics] = useState([]);

  const filterPhotosForMapArea = async () => {
    
    if(boundaries[0] > boundaries[2]){
      try {
        const AmericanPhotos = await getPhotosforMapArea({
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: -180,
          maxLng: boundaries[2],
        });
        const AsianPhotos = await getPhotosforMapArea({
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: boundaries[0],
          maxLng: 180,
        });

        let photos = [...AsianPhotos, ...AmericanPhotos]
        
        if (photos) {
          const animalArray = Array.from(
                    new Set(photos.map((a) => a.label))
                  ).map((label) => {
                    return photos.find((a) => a.label === label);
                  });
  
          setAreaPics(animalArray);
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    } else {
      try {
        const photos = await getPhotosforMapArea({
          minLat: boundaries[1],
          maxLat: boundaries[3],
          minLng: boundaries[0],
          maxLng: boundaries[2],
        });
        if (photos) {
  
          const animalArray = Array.from(
                    new Set(photos.map((a) => a.label))
                  ).map((label) => {
                    return photos.find((a) => a.label === label);
                  });
  
          setAreaPics(animalArray);
        }
      } catch (e) {
        console.log({ title: "Error", message: e.message });
      }
    }
 
  };

  const filterHeatPointsForMapArea = async () => {

         try {
          const localHeatPoints = await multiHeatPoints(
            {
              minLat: boundaries[1],
              maxLat: boundaries[3],
              minLng: boundaries[0],
              maxLng: boundaries[2],
            },
            animalVal
          );
          if (localHeatPoints) {
            setHeatPts(formatHeatVals(localHeatPoints));
          }
        } catch (e) {
          console.log({ title: "Error", message: e.message });
        }
    };

  useEffect(() => {
    filterPhotosForMapArea();
  }, []);

  useEffect(() => {
    filterHeatPointsForMapArea();
  }, [animalVal]);
  

  useEffect(() => {
    filterPhotosForMapArea();
  }, [boundaries]);

  
  return (
    <div className="masterDiv2">
      {/* <div className="picContainer">
        <div className="areLabel">Sightings</div>
      </div> */}
      <div className="picScoll2">
      <AliceCarousel
      responsive={{
          0: {items: 1},
          500: {items: 2},
          700: {items: 3},
          900: {items: 4},
          1100: {items: 5},
          1300: {items: 6},
          1500: {items: 7},
          1700: {items: 8},
          1900: {items: 9},
          2100: {items: 10},
      }}
        mouseTracking items={areaPics &&
          areaPics.map((pic) => {
            return (
              <PhotoMenuListItem 
              key={pic.id}
              id={pic.id}
              name={pic.label}
              photoURL={pic.photoFile}
              setAnimalVal={setAnimalVal}
              animalVal={animalVal}
              />
            );
          })}
            />
        {areaPics.length === 0 && (
          <div className="emptyPhotos">
            No Sea Creatures have been added for this area yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoMenu;
