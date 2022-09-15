import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import exifr from "exifr";
import Autosuggest from "react-autosuggest";
import AnimalAutoSuggest from "../AutoSuggest";
import { useNavigate } from "react-router-dom";
import { PinContext } from "../contexts/pinContext";
import { PictureContext } from "../contexts/pictureContext";
import PlaceIcon from "@mui/icons-material/Place";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import { getToday } from "../../helpers/picUploaderHelpers.js";
import Collapse from "@mui/material/Collapse";
import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";
import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
import { getAnimalNamesThatFit } from "../../axiosCalls/photoAxiosCalls"
import AnimalSearchForModal from "./AnimalSearchModal";

let filePath1 = "./wetmap/src/components/uploads/";
let filePath = "/src/components/uploads/";

const noGPSZone = (
  <div
    style={{
      marginLeft: "2%",
      backgroundColor: "pink",
      height: "40px",
      width: "95%",
      color: "red",
      borderRadius: "15px",
    }}
  >
    <h4 style={{ marginLeft: "35px", paddingTop: "10px" }}>
      No GPS Coordinates Found!
    </h4>
  </div>
);

const PicUploader = React.memo((props) => {
  const { closeup } = props;
  let navigate = useNavigate();
  const { pin, setPin } = useContext(PinContext);
  const [list, setList] = useState([])
  const [showNoGPS, setShowNoGPS] = useState(false);

  const { photoFile, setPhotoFile } = useContext(PictureContext);

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  useEffect(() => {
    if (pin.PicDate === "") {
      let Rnow = new Date();

      let rightNow = getToday(Rnow);

      setPin({
        ...pin,
        PicDate: rightNow,
      });
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "PicFile") {

      if (photoFile !== null){
        removePhoto({filePath: filePath1, fileName: photoFile})
      }
     

      let fileName = e.target.files[0];
      let baseDate = e.target.files[0].lastModified;

      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      var convDate = new Date(baseDate);

      let moddedDate = getToday(convDate);

      const data = new FormData();
      data.append("image", fileName);

      fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setPhotoFile(data.fileName)
        });

      exifr.parse(e.target.files[0]).then((output) => {
        let EXIFData = exifGPSHelper(
          output.GPSLatitude,
          output.GPSLongitude,
          output.GPSLatitudeRef,
          output.GPSLongitudeRef
        );

        if (EXIFData) {
          setPin({
            ...pin,
            PicFile: photoFile,
            PicDate: moddedDate,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setPin({
            ...pin,
            PicFile: photoFile,
            PicDate: moddedDate,
            Latitude: pin.Latitude,
            Longitude: pin.Longitude,
          });
          setShowNoGPS(true);
        }

      });
    } else {
      setPin({ ...pin, [e.target.name]: e.target.value });
    }

  };

  const handleNoGPSClose = () => {
    setShowNoGPS(false);
    return;
  };

  const handleNoGPSCloseOnMapChange = () => {
    setShowNoGPS(false);
    navi();
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let AnimalV = pin.Animal.toString();
    let LatV = parseFloat(pin.Latitude);
    let LngV = parseFloat(pin.Longitude);

    if (
      pin.PicFile &&
      AnimalV &&
      typeof AnimalV === "string" &&
      LatV &&
      typeof LatV == "number" &&
      LngV &&
      typeof LngV == "number"
    ) {

      let Rnow = new Date();

      let rightNow = getToday(Rnow);

      insertPhotoWaits({ ...pin, PicFile: photoFile})

      setPin({
        PicFile: "",
        PicDate: rightNow,
        Animal: "",
        Latitude: "",
        Longitude: "",
      });
      closeup();
      return;
    }
  };

  const navi = () => {
    navigate("/pinDrop");
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle2">
          <Label>
            <strong>Submit Your Picture</strong>
          </Label>
        </div>

            {photoFile && (
            <div className='pickie'>
            <img src={filePath + photoFile} height="100px" className="picHolder"></img>
            </div>
            )}

        <div className="uploadbox2">
          <FormGroup>
            <Input
              placeholder="Upload"
              className="modalInputs2"
              style={{ textAlign: "center", fontFamily: 'Indie Flower', }}
              id="file"
              type="file"
              name="PicFile"
              bsSize="lg"
              onChange={handleChange}
              onClick={handleNoGPSClose}
            ></Input>
          </FormGroup>
        </div>

        <div className="autosuggestbox">
        {/* <div className="AutoSug"> */}
        <AnimalAutoSuggest setPin={setPin} pin={pin}/>
      {/* </div> */}
        </div>

        <div className="inputboxType1">
          <FormGroup>
            <TextField
              id="standard-basic"
              // label="Date Taken"
              placeholder="Date Taken"
              variant="standard"
              type="date"
              name="PicDate"
              value={pin.PicDate}
              onChange={handleChange}
              onClick={handleNoGPSClose}
              sx={{ width: "167px" }}
              inputProps={{style: {textAlign: 'center', fontFamily: 'Indie Flower'}}}
            />
          </FormGroup>
        </div>

        <Collapse in={showNoGPS} orientation="vertical" collapsedSize="0px">
          {noGPSZone}
        </Collapse>

        <div className="Tbox">
          <div>
            <div className="inputboxType2">
              <FormGroup>
                <TextField
                  id="standard-basic"
                  // label="Latitude"
                  placeholder="Latitude"
                  variant="standard"
                  type="decimal"
                  name="Latitude"
                  value={pin.Latitude}
                  onChange={handleChange}
                  onClick={handleNoGPSClose}
                  inputProps={{style: {textAlign: 'center', fontFamily: 'Indie Flower'}}}
                />
              </FormGroup>
            </div>

            <div className="inputboxType2">
              <FormGroup>
                <TextField
                  id="standard-basic"
                  // label="Longitude"
                  placeholder="Longitude"
                  variant="standard"
                  type="decimal"
                  name="Longitude"
                  value={pin.Longitude}
                  onChange={handleChange}
                  onClick={handleNoGPSClose}
                  inputProps={{style: {textAlign: 'center', fontFamily: 'Indie Flower'}}}
                />
              </FormGroup>
            </div>
          </div>
          <div className="Gbox">
            <FormGroup>
              <Button
                variant="text"
                id="jumpButton"
                onClick={handleNoGPSCloseOnMapChange}
              >
                <PlaceIcon
                  sx={{ color: "maroon", height: "40px", width: "40px" }}
                ></PlaceIcon>
              </Button>
            </FormGroup>
          </div>
        </div>

        <FormGroup>
          <Button variant="text" id="modalButton" onClick={handleSubmit}>
            Submit Photo
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
});

export default PicUploader;
