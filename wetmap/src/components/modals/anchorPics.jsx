import { SelectedDiveSiteContext } from "../contexts/selectedDiveSiteContext";
import { SliderContext } from "../contexts/sliderContext";
import { AnimalContext } from "../contexts/animalContext";
import { useState, useContext, useEffect } from "react";
import { siteGPSBoundaries } from "../../helpers/mapHelpers";
import { getPhotosforAnchor } from "../../supabaseCalls/photoSupabaseCalls";
// import { getPhotosforAnchor } from "../../axiosCalls/photoAxiosCalls";
import "photoswipe/dist/photoswipe.css";
import FlagIcon from "@mui/icons-material/Flag";
import { Gallery, Item } from "react-photoswipe-gallery";

import "./anchorPics.css";

// let filePath = "/src/components/uploads/";

const AnchorPics = (props) => {
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { sliderVal } = useContext(SliderContext);
  const { animalVal } = useContext(AnimalContext);
  const [monthVal, setMonthVal] = useState("");
  const [anchorPics, setAnchorPics] = useState([]);

  const filterAnchorPhotos = async () => {
    let { minLat, maxLat, minLng, maxLng } = siteGPSBoundaries(
      selectedDiveSite.Latitude,
      selectedDiveSite.Longitude
    );

    try {
      const photos = await getPhotosforAnchor({
        animalVal,
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
      <div className="flagContainer">
      <div className="monthlyLabel">{monthVal} Sightings</div>
      <a
        className="atagDS"
        href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20Dive%20Site:%20"${selectedDiveSite.SiteName}"%20at%20Latitude:%20${selectedDiveSite.Latitude}%20Longitude:%20${selectedDiveSite.Longitude}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Dive%20site%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20dive%20site%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Dive%20site%20GPS%20coordinates%20are%20not%20correct%0D%0A%0D%0A(Please%20provide%20a%20correct%20latitude%20and%20longitude%20and%20we%20will%20update%20the%20record)`}
      >
        <FlagIcon sx={{ color: "maroon" }} />
      </a>
      </div>
      <div className="picScoll">
        {anchorPics &&
          anchorPics.map((pic) => {
            return (
              <div key={pic.id} className="pictureBox">
                <div className="micro">
                  <a
                    className="atag"
                    href={`mailto:DiveGo2022@gmail.com?subject=Reporting%20issue%20with%20picture:%20"${pic.label}"%20${pic.photoFile}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Animal%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20animal%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Copy%20write%20image%20claim%0D%0A%0D%0A(Please%20provide%20proof%20that%20you%20own%20the%20submitted%20photo%20and%20we%20will%20remove%20it%20as%20you%20have%20requested)`}
                  >
                    <FlagIcon sx={{ color: "maroon", marginBottom: "-28px" }} />
                  </a>
                  <h4 className="animalLabel">{pic.label}</h4>
                </div>
                <Gallery>
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
                            marginLeft: "23%",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                          ref={ref}
                          onClick={open}
                          src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${pic.photoFile}`}
                        />
                      )}
                    </Item>
                  </div>
                </Gallery>
              </div>
            );
          })}
        {anchorPics.length === 0 && (
          <div className="emptySite">
            No Sightings At This Site Yet For This Time Of Year!
          </div>
        )}
      </div>
    </div>
  );
};

export default AnchorPics;
