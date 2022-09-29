import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { SliderContext } from "../contexts/sliderContext";
import { useState, useContext, useEffect } from "react";
import { siteGPSBoundaries } from "../../helpers/mapHelpers";
import { getPhotosforAnchor } from "../../supabaseCalls/photoSupabaseCalls";
// import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
import "./anchorPics.css";

// let filePath = "/src/components/uploads/";

const AnchorPics = (props) => {
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { sliderVal } = useContext(SliderContext);

  const [monthVal, setMonthVal] = useState("");
  const [anchorPics, setAnchorPics] = useState([]);

  const filterAnchorPhotos = async () => {
    let { minLat, maxLat, minLng, maxLng } = siteGPSBoundaries(
      selectedDiveSite.Latitude,
      selectedDiveSite.Longitude
    );

    try {
      const photos = await getPhotosforAnchor({
        sliderVal,
        minLat,
        maxLat,
        minLng,
        maxLng,
      });
      if (photos) {
        setAnchorPics(photos);
      }
    } catch (e) {
      console.log({ title: "Error", message: e.message });
    }
  };

  useEffect(() => {
    switch (sliderVal) {
      case 1:
        setMonthVal("January");
        break;
      case 2:
        setMonthVal("February");
        break;
      case 3:
        setMonthVal("March");
        break;
      case 4:
        setMonthVal("April");
        break;
      case 5:
        setMonthVal("May");
        break;
      case 6:
        setMonthVal("June");
        break;
      case 7:
        setMonthVal("July");
        break;
      case 8:
        setMonthVal("August");
        break;
      case 9:
        setMonthVal("September");
        break;
      case 10:
        setMonthVal("October");
        break;
      case 11:
        setMonthVal("November");
        break;
      case 12:
        setMonthVal("December");
        break;
    }
  }, [sliderVal]);

  useEffect(() => {
    filterAnchorPhotos();
  }, []);

  useEffect(() => {
    filterAnchorPhotos();
  }, [selectedDiveSite]);

  return (
    <div className="masterDiv">
      <h3 className="DiveSiteLabel">{selectedDiveSite.SiteName}</h3>
      <div className="monthlyLabel">{monthVal} Sightings</div>

      <div className="picScoll">
      {anchorPics && anchorPics.map((pic) => {
        return (
          <div key={pic.id} className="pictureBox">
            <h4 className="animalLabel">{pic.label}</h4>
              <img src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`} className="picHolderX" style={{width: '100%'}}></img>
          </div>
        );
      })} 
      {anchorPics.length === 0 && <div className="emptySite">No Sightings At This Site Yet For This Time Of Year!</div>}
      </div>
    </div>
  );
};

export default AnchorPics;
