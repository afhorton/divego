import React, { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./picUploader.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import exifr from "exifr";
import { useNavigate } from "react-router-dom";
import { PinContext } from "../contexts/pinContext";
import PlaceIcon from "@mui/icons-material/Place";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import Collapse from "@mui/material/Collapse";
import { insertPhotoWaits } from "../../axiosCalls/photoWaitAxiosCalls";
import {
  uploadphoto,
  getPhotoFileName,
} from "../../axiosCalls/uploadAxiosCalls";

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
  const [showNoGPS, setShowNoGPS] = useState(false);

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  useEffect(() => {
    if (pin.PicDate === "") {
      let Rnow = new Date();

      let yr0 = Rnow.getFullYear().toString();
      let mth0 = (Rnow.getMonth() + 1).toString();
      let dy0 = Rnow.getDate().toString();

      if (dy0.length == 1) {
        dy0 = "0" + dy0;
      }

      if (mth0.length == 1) {
        mth0 = "0" + mth0;
      }

      let rightNow = yr0 + "-" + mth0 + "-" + dy0;

      setPin({
        ...pin,
        PicDate: rightNow,
      });
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "PicFile") {
      let fileName = e.target.files[0];
      let baseDate = e.target.files[0].lastModified;

      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      var convDate = new Date(baseDate);

      let yr = convDate.getFullYear().toString();
      let mth = (convDate.getMonth() + 1).toString();
      let dy = convDate.getDate().toString();

      if (dy.length == 1) {
        dy = "0" + dy;
      }

      if (mth.length == 1) {
        mth = "0" + mth;
      }

      let moddedDate = yr + "-" + mth + "-" + dy;

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
            PicFile: fileName,
            PicDate: moddedDate,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setPin({
            ...pin,
            PicFile: fileName,
            PicDate: moddedDate,
            Latitude: "",
            Longitude: "",
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

    const data = new FormData();

    console.log("WHADAFUCK?", pin);

    data.append("image", pin.PicFile);

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => insertPhotoWaits({...pin, PicFile: data.fileName}))
     
    closeup();
    return;
  };

  const navi = () => {
    navigate("/pinDrop");
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle">
          <Label>
            <strong>Please Upload Your Picture</strong>
          </Label>
        </div>

        <div className="uploadbox2">
          <FormGroup>
            <Input
              placeholder="Upload"
              className="modalInputs2"
              style={{ textAlign: "center" }}
              id="file"
              type="file"
              name="PicFile"
              bsSize="lg"
              onChange={handleChange}
              onClick={handleNoGPSClose}
            ></Input>
          </FormGroup>
        </div>

        <div className="inputboxType1">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Animal"
              variant="standard"
              type="text"
              name="Animal"
              value={pin.Animal}
              onChange={handleChange}
              onClick={handleNoGPSClose}
            />
          </FormGroup>
        </div>

        <div className="inputboxType1">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Date Taken"
              variant="standard"
              type="date"
              name="PicDate"
              value={pin.PicDate}
              onChange={handleChange}
              onClick={handleNoGPSClose}
              sx={{ width: "167px" }}
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
                  label="Latitude"
                  variant="standard"
                  type="decimal"
                  name="Latitude"
                  value={pin.Latitude}
                  onChange={handleChange}
                  onClick={handleNoGPSClose}
                />
              </FormGroup>
            </div>

            <div className="inputboxType2">
              <FormGroup>
                <TextField
                  id="standard-basic"
                  label="Longitude"
                  variant="standard"
                  type="decimal"
                  name="Longitude"
                  value={pin.Longitude}
                  onChange={handleChange}
                  onClick={handleNoGPSClose}
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
