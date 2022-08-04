// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback, useRef, useEffect} from "react";
import { Form, Input, FormFeedback } from "reactstrap";
import { insertphoto } from "../../axiosCalls/photoAxiosCalls";
import {
  grabPhotoWaitById,
  deletePhotoWait,
} from "../../axiosCalls/photoWaitAxiosCalls";
import { Buffer } from "buffer";

const PhotoListItem = (props) => {
  const {
    key,
    photoFile,
    animal,
    date,
    lat,
    lng,
  } = props;

  const [imgURL, setImgURL] = useState();

  let photoById;

  const ValidatePhoto = async (id) => {
    photoById = await grabPhotoWaitById(id);
    photoById ? insertphoto(photoById[0]) && deletePhotoWait(id) : [];
  };

  const RejectPhoto = (id) => {
    deletePhotoWait(id);
  };

function arrayBufferToBase64(photoFile) {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(photoFile.data));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
}

let data;
useEffect(() => {
  data = arrayBufferToBase64(photoFile)
  let base64flag = 'data:image/jpg;base64,'
  setImgURL(base64flag + data)
},[])

console.log("ImgURL", imgURL)
  const [formVals, setFormVals] = useState({
    key: key,
    photo: imgURL,
    animal: animal,
    date: date,
    lat: lat,
    lng: lng,
  });

  useEffect(() => {
   setFormVals({
    key: key,
    photo: imgURL,
    animal: animal,
    date: date,
    lat: lat,
    lng: lng,
   })
  }, [props])


  const handleChange = (e) => {
      setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div>{imgURL}
      <li id={key} key={key} className="photoLI">
      <div id="photoContainer">
        <Form id="photoValidator">
       
          <img src={imgURL}></img>
          
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="anial"
            type="text"
            style={{ minWidth: "0px", maxWidth: "160px" }}
            value={formVals.animal}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="date"
            type="date"
            style={{ minWidth: "100px", maxWidth: "160px" }}
            value={formVals.date && formVals.date.substring(0, 10)}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="lat"
            type="number"
            value={formVals.lat}
            style={{ minWidth: "100px", maxWidth: "60px", textAlign: "center" }}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="lng"
            type="number"
            style={{ minWidth: "100px", maxWidth: "160px" }}
            value={formVals.lng}
          >
          </Input>
        </Form>
      </div>
    </li>
    </div>
  );
};

export default PhotoListItem;
