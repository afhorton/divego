// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback, useRef, useEffect } from "react";
import { Form, Input, Label } from "reactstrap";
import { insertphoto } from "../../axiosCalls/photoAxiosCalls";
import {
  grabPhotoWaitById,
  deletePhotoWait,
} from "../../axiosCalls/photoWaitAxiosCalls";
import {
  getLoneHeatPoint,
  insertHeatPoint,
  updateHeatPoint,
} from "../../axiosCalls/heatPointAxiosCalls";
import { scrapeMonthNumber } from "../../helpers/heatPointHelpers";
import Fab from "@mui/material/Fab";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./photoVetting.css";

let filePath = "/src/components/uploads/";

const PhotoListItem = (props) => {
  const { key, id, photoFile, animal, date, lat, lng } = props;

  let photoById;
  let heatPointExists;

  const ValidatePhoto = async (id) => {
    photoById = await grabPhotoWaitById(id);

    let monthID = scrapeMonthNumber(photoById[0].datetaken);

    heatPointExists = await getLoneHeatPoint({
      lat: photoById[0].latitude,
      lng: photoById[0].longitude,
      animal: photoById[0].label,
      month: monthID,
    });

    heatPointExists.length > 0
      ? updateHeatPoint({
          id: heatPointExists[0].id,
          weight: heatPointExists[0].weight,
        })
      : insertHeatPoint({
          lat: photoById[0].latitude,
          lng: photoById[0].longitude,
          animal: photoById[0].label,
          month: monthID,
        });

    photoById ? insertphoto(photoById[0]) && deletePhotoWait(id) : [];
  };

  const RejectPhoto = (id) => {
    deletePhotoWait(id);
  };

  const [formVals, setFormVals] = useState({
    id: id,
    key: key,
    photo: filePath + photoFile,
    animal: animal,
    date: date,
    lat: lat,
    lng: lng,
  });

  useEffect(() => {
    setFormVals({
      id: id,
      key: key,
      photo: filePath + photoFile,
      animal: animal,
      date: date,
      lat: lat,
      lng: lng,
    });
  }, [props]);

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <li
      id={key}
      key={key}
      className="photoLI"
      style={{ listStyleType: "none" }}
    >
      <div id="photoContainer">
        <Form id="photoValidator">
          <div className="imageBox">
            <img src={formVals.photo} height="100px" className="Itag"></img>
          </div>
          <div className="infoBox">
            <div className="labelInputCombo">
              <Label className="labels">Animal: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="animal"
                type="text"
                value={formVals.animal}
                style={{ textAlign: "left" }}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Date Taken: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="date"
                type="date"
                disabled={"disabled"}
                value={formVals.date && formVals.date.substring(0, 10)}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Latitude: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="lat"
                type="number"
                disabled={"disabled"}
                value={formVals.lat}
              ></Input>
            </div>
            <div className="labelInputCombo">
              <Label className="labels">Longitude: </Label>
              <Input
                id="inpt"
                onChange={handleChange}
                onBlur={handleSubmit}
                name="lng"
                type="number"
                disabled={"disabled"}
                value={formVals.lng}
              ></Input>
            </div>
          </div>
          <div className="FABbox">
            <div className="FAB">
              <Fab color="primary" aria-label="add">
                <TaskAltIcon onClick={() => ValidatePhoto(id)} />
              </Fab>
            </div>
            <div className="FAB">
              <Fab color="secondary" aria-label="add">
                <HighlightOffIcon onClick={() => RejectPhoto(id)} />
              </Fab>
            </div>
          </div>
        </Form>
      </div>
    </li>
  );
};

export default PhotoListItem;
