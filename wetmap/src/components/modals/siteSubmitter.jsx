import { useState, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import "./siteSubmitter.css";
import exifr from "exifr";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import PhotoIcon from "@mui/icons-material/Photo";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { exifGPSHelper } from "../../helpers/exifGPSHelpers";
import Collapse from "@mui/material/Collapse";
import { insertDiveSiteWaits } from "../../supabaseCalls/diveSiteWaitSupabaseCalls";
import { userCheck } from "../../supabaseCalls/authenticateSupabaseCalls";

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

const SiteSubmitter = (props) => {
  const { closeup } = props;
  const [showNoGPS, setShowNoGPS] = useState(false);

  const [formVals, setFormVals] = useState({
    Site: "",
    Latitude: "",
    Longitude: "",
    UserID: "",
  });

  let UserId;

  // useEffect(() => {
  //   const getUser = async () => {
  //     UserId = await userCheck();
  //     setFormVals({ ...formVals, UserID: UserId.id });
  //   };
  
  //   getUser();
  // }, []);

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });

    if (e.target.name === "PicFile") {
      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      exifr.parse(e.target.files[0]).then((output) => {
        let EXIFData = exifGPSHelper(
          output.GPSLatitude,
          output.GPSLongitude,
          output.GPSLatitudeRef,
          output.GPSLongitudeRef
        );

        if (EXIFData) {
          setFormVals({
            ...formVals,
            Latitude: EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setFormVals({ ...formVals });
          setShowNoGPS(true);
        }
      });
    }
  };

  const handleDiveSiteGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setFormVals({
            ...formVals,
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.log("location permissions denied", error.message);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log("unsupported");
    }
  };

  const handleNoGPSClose = () => {
    setShowNoGPS(false);
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let SiteV = formVals.Site.toString();
    let LatV = parseFloat(formVals.Latitude);
    let LngV = parseFloat(formVals.Longitude);

    if (
      SiteV &&
      typeof SiteV === "string" &&
      LatV &&
      typeof LatV === "number" &&
      LngV &&
      typeof LngV === "number"
    ) {
      insertDiveSiteWaits(formVals);
      setFormVals({});
      closeup();
      return;
    }
  };

  function handleClick() {
    document.getElementById("file").click();
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <div className="modalTitle3">
          <Label>
            <strong>Submit Your Dive Site</strong>
          </Label>
        </div>

        <div className="uploadbox">
          <div onClick={handleClick} className="fileSelectDiv">
            <div style={{ marginRight: 5, marginTop: -2 }}>
              <PhotoIcon
                sx={{
                  color: "gold",
                  height: "28px",
                  width: "28px",
                  cursor: "pointer",
                  marginTop: "5px",
                  marginLeft: "10px",
                }}
              ></PhotoIcon>
            </div>

            <Label
              style={{
                fontFamily: "Bubblegum Sans, cursive",
                color: "gold",
                cursor: "pointer",
                marginTop: "7px",
                marginLeft:  "-5px",
                fontSize: "18px"
              }}
            >
              Choose a File
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

        <div className="inputbox">
          <FormGroup>
            <InputBase
              id="standard-basic"
              placeholder="Site Name"
              type="text"
              name="Site"
              onChange={handleChange}
              onClick={handleNoGPSClose}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontFamily: "Indie Flower",
                  textOverflow: "ellipsis",
                  backgroundColor: "#538bdb",
                  height: "25px",
                  color: "#F0EEEB",
                  width: "170px",
                  borderRadius: "10px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)"
                },
              }}
            />
          </FormGroup>
        </div>

        <Collapse in={showNoGPS} orientation="vertical" collapsedSize="0px">
          {noGPSZone}
        </Collapse>

        <div className="inputbox" >
          <FormGroup>
            <InputBase
              id="standard-basic"
              placeholder="Latitude"
              type="decimal"
              name="Latitude"
              value={formVals.Latitude}
              onChange={handleChange}
              onClick={handleNoGPSClose}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontFamily: "Indie Flower",
                  textOverflow: "ellipsis",
                  backgroundColor: "#538BDB",
                  height: "25px",
                  color: "#F0EEEB",
                  width: "170px",
                  borderRadius: "10px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)"
                }
              }}
            />
          </FormGroup>
        </div>

        <div className="inputbox">
          <FormGroup>
            <InputBase
              id="standard-basic"
              placeholder="Longitude"
              type="decimal"
              name="Longitude"
              value={formVals.Longitude}
              onChange={handleChange}
              onClick={handleNoGPSClose}
              inputProps={{
                style: {
                  textAlign: "center",
                  fontFamily: "Indie Flower",
                  textOverflow: "ellipsis",
                  backgroundColor: "#538bdb",
                  height: "25px",
                  color: "#F0EEEB",
                  width: "170px",
                  borderRadius: "10px",
                  boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)"
                },
              }}
            />
          </FormGroup>
        </div>

        <FormGroup>
          <div onClick={handleDiveSiteGPS} className="GPSbutton">
            <div style={{ marginLeft: 3, marginRight: 2, marginTop: -2 }}>
              <MapOutlinedIcon
                sx={{
                  color: "gold",
                  height: "28px",
                  width: "28px",
                  cursor: "pointer",
                  marginTop: "2.5px",
                  marginLeft: "5px",
                }}
              ></MapOutlinedIcon>
            </div>

            <Label
              style={{
                fontFamily: "Bubblegum Sans, cursive",
                color: "gold",
                cursor: "pointer",
                marginTop: "7px",
                marginRight: "5px",
                fontSize: "15px"
              }}
            >
              I'm At The Dive Site
            </Label>
          </div>
        </FormGroup>

        <FormGroup>
          <Button variant="text" id="modalButton2" onClick={handleSubmit}>
            Submit Dive Site
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default SiteSubmitter;
