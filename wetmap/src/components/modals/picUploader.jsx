import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import exifr from "exifr";
import Autosuggest from "react-autosuggest";
import AnimalAutoSuggest from "../AutoSuggest";
import { useNavigate } from "react-router-dom";
import { MasterContext } from "../contexts/masterContext";
import { PinContext } from "../contexts/pinContext";
import { PictureContext } from "../contexts/pictureContext";
import PlaceIcon from "@mui/icons-material/Place";
import PhotoIcon from "@mui/icons-material/Photo";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import { getToday } from "../../helpers/picUploaderHelpers.js";
import Collapse from "@mui/material/Collapse";
import { insertPhotoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
// import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";
import { uploadphoto } from "../../supabaseCalls/uploadSupabaseCalls";
import { removePhoto } from "../../supabaseCalls/uploadSupabaseCalls";
// import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
import { getAnimalNamesThatFit } from "../../axiosCalls/photoAxiosCalls";
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
  const { setMasterSwitch } = useContext(MasterContext);
  const { pin, setPin } = useContext(PinContext);
  const [showNoGPS, setShowNoGPS] = useState(false);
  const [list, setList] = useState([]);
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

  const handleChange = async(e) => {
    if (e.target.name === "PicFile") {
      if (photoFile !== null) {
        removePhoto({ filePath: filePath1, fileName: photoFile });
      }

      let fileName = e.target.files[0];
      let baseDate = e.target.files[0].lastModified;

      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      var convDate = new Date(baseDate);

      let moddedDate = getToday(convDate);

      const data = new FormData();
      data.append("image", fileName);

     
      const newFilePath = await uploadphoto(fileName, fileName.name)
      setPhotoFile(newFilePath)
     
      
      // fetch("http://localhost:5000/api/upload", {
      //   method: "POST",
      //   body: data,
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setPhotoFile(data.fileName);
      //   });

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
            PicFile: newFilePath,
            PicDate: moddedDate,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setPin({
            ...pin,
            PicFile: newFilePath,
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
    setMasterSwitch(false);
    closeup();
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

      insertPhotoWaits({ ...pin, PicFile: photoFile });

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

  const clearAnimal = () => {
    setPin({ ...pin, Animal: "" });
    setList([]);
  };

  function handleClick() {
    document.getElementById("file").click();
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle2">
          <Label>
            <strong>Submit Your Picture</strong>
          </Label>
        </div>

        {photoFile && (
          <div className="pickie">
            <img
              src={`https://lsakqvscxozherlpunqx.supabase.co/storage/v1/object/public/${photoFile}`}
              height="100px"
              className="picHolder"
            ></img>
          </div>
        )}

        <div className="uploadbox2">
          <div
            onClick={handleClick}
            style={{ display: "flex", flexDirection: "row", marginLeft: -12, cursor: "pointer", width: 170 }}
          >
            <div style={{ marginRight: 5, marginTop: -2 }}>
              <PhotoIcon
                sx={{ color: "red", height: "28px", width: "28px", cursor: "pointer" }}
              ></PhotoIcon>
            </div>

            <Label style={{ fontFamily: "Permanent Marker", color: "maroon", cursor: "pointer"}}>
              Choose an Image
            </Label>
          </div>
          <FormGroup>
            <Input
              placeholder="Upload"
              className="modalInputs2"
              style={{
                textAlign: "center",
                fontFamily: "Indie Flower",
                display: "none",
              }}
              id="file"
              type="file"
              name="PicFile"
              bsSize="lg"
              onChange={handleChange}
              onClick={handleNoGPSClose}
            ></Input>
          </FormGroup>
        </div>

        <div className="autosuggestbox" onClick={handleNoGPSClose}>
          <AnimalAutoSuggest
            setPin={setPin}
            pin={pin}
            setList={setList}
            list={list}
            onClick={handleNoGPSClose}
          />
          {pin.Animal.length > 1 && (
            <div variant="text" id="XButton" onClick={clearAnimal}>
              <HighlightOffIcon
                sx={{ color: "gray", height: "10px", width: "10px" }}
              ></HighlightOffIcon>
            </div>
          )}
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
              inputProps={{
                style: {
                  textAlign: "center",
                  fontFamily: "Indie Flower",
                  textOverflow: "ellipsis",
                },
              }}
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
                  inputProps={{
                    readOnly: true,
                    style: {
                      textAlign: "center",
                      fontFamily: "Indie Flower",
                      textOverflow: "ellipsis",
                    },
                  }}
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
                  contentEditable={false}
                  value={pin.Longitude}
                  onChange={handleChange}
                  onClick={handleNoGPSClose}
                  inputProps={{
                    readOnly: true,
                    style: {
                      textAlign: "center",
                      fontFamily: "Indie Flower",
                      textOverflow: "ellipsis",
                    },
                  }}
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
                style={{display: 'flex', flexDirection: "column"}}
              >
                <PlaceIcon
                  sx={{ color: "red", height: "40px", width: "40px" }}
                ></PlaceIcon>
                <p style={{fontFamily: "Shadows Into Light", color: "maroon", fontSize: 11, marginTop: -1}}>Drop Pin</p>
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
