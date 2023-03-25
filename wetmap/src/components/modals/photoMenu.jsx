import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { SliderContext } from "../contexts/sliderContext";
import { AnimalContext } from "../contexts/animalContext";
import { AnimalMultiSelectContext } from "../contexts/animalMultiSelectContext";
import { useState, useContext, useEffect } from "react";
import { siteGPSBoundaries } from "../../helpers/mapHelpers";
import { picClickheatPoints } from "../../supabaseCalls/heatPointSupabaseCalls";
import { getPhotosforAnchor, getPhotosforAnchorMulti, getPhotosforMapArea } from "../../supabaseCalls/photoSupabaseCalls";
import { MapBoundsContext } from "../contexts/mapBoundariesContext";
import { HeatPointsContext } from "../contexts/heatPointsContext";
// import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
import "photoswipe/dist/photoswipe.css";
import FlagIcon from "@mui/icons-material/Flag";
import { Gallery, Item } from "react-photoswipe-gallery";
import { formatHeatVals } from "../../helpers/heatPointHelpers";
import "./photoMenu.css";

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

    try {
      const photos = await getPhotosforMapArea({
        minLat: boundaries[1],
        maxLat: boundaries[3],
        minLng: boundaries[0],
        maxLng: boundaries[2],
      });
      if (photos) {
        setAreaPics(photos);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  const filterHeatPointsForMapArea = async (pickedAnimal) => {

    setAnimalVal(pickedAnimal)

    try {
      const localHeatPoints = await picClickheatPoints({ 
        minLat: boundaries[1],
        maxLat: boundaries[3],
        minLng: boundaries[0],
        maxLng: boundaries[2],
      }, pickedAnimal);
      if (localHeatPoints) {
        setHeatPts(formatHeatVals(localHeatPoints))
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };


  useEffect(() => {
    filterPhotosForMapArea();
  }, []);

  useEffect(() => {
    filterPhotosForMapArea();
  }, [boundaries]);

  return (
    <div className="masterDiv2">
      <div className="picContainer">
      <div className="areLabel">Sightings</div>
      </div>
      <div className="picScoll2">
        {areaPics &&
          areaPics.map((pic) => {
            return (
              <div key={pic.id} className="pictureBoxA">
                <div className="micros">
                  <h4 className="animalLabelArea">{pic.label}</h4>
                </div>
                <img 
                src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
                width = "192px"
                height = "108px"
                onClick={() => filterHeatPointsForMapArea(pic.label)}
                />
                {/* <Gallery>
                  <div>
                    <Item
                      original={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
                      thumbnail={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
                      width="992"
                      height="558"
                      style={{ borderRadius: 10 }}
                    >
                      {({ ref, open }) => (
                        <img
                          style={{
                            width: "192px",
                            height: "108px",
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            objectFit: "cover",
                          }}
                          ref={ref}
                          onClick={open}
                          src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
                        />
                      )}
                    </Item>
                  </div>
                </Gallery> */}
              </div>
            );
          })}
        {areaPics.length === 0 && (
          <div className="emptySite">
            No Sea Creatures have been added for this area yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoMenu;
