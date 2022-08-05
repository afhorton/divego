import React from "react";
import Homeo from "./Home";
import Home from "./googleMap";
import FormModal from "./modals/formModal";
import FormGuideModal from "./modals/formGuideModal";
import MonthSlider from "./Slider";
import GeoCoder from "./geoCoder";
import AdminPortal from "./adminPortal";
import PicUploader from "./modals/picUploader";
import SiteSubmitter from "./modals/siteSubmitter";
import HowToGuide from "./modals/howToGuide";
import AnimalSearcher from "./AnimalSearch";
import { useState, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Collapse from "@mui/material/Collapse";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import AnchorIcon from "@mui/icons-material/Anchor";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { AnimalContext } from "./contexts/animalContext";
import { PicModalContext } from "./contexts/picModalContext";
import "./mapPage.css";

const geoCoderZone = (
  <div style={{ marginLeft: "10px" }}>
    <GeoCoder></GeoCoder>
  </div>
);
const animalSearchZone = (
  <div style={{ marginLeft: "10px" }}>
    <AnimalSearcher></AnimalSearcher>
  </div>
);

const adminPortalZone = (
  <div style={{ marginLeft: "10px" }}>
    <AdminPortal></AdminPortal>
  </div>
);

const MapPage = React.memo(() => {
  const { divesTog, setDivesTog } = useContext(DiveSitesContext);
  const [showGeoCoder, setShowGeoCoder] = useState(false);
  const [showAnimalSearch, setShowAnimalSearch] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const { animalVal } = useContext(AnimalContext);

  const { picModal, setPicModal } = useContext(PicModalContext);

  const togglePicModal = () => {
    setPicModal(!picModal);
  };

  const [diveSiteModal, setDiveSiteModal] = useState(false);

  const toggleAddDiveSiteModal = () => {
    setDiveSiteModal(!diveSiteModal);
  };

  const [guideModal, setGuideModal] = useState(false);

  const toggleGuideModal = () => {
    setGuideModal(!guideModal);
  };

  return (
    <div>
      <div className="col2rowT">
        <MonthSlider />
      </div>
      <div className="col3rowT"></div>

      <div
        className="col1row2"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "gold" },
            "&.Mui-selected:hover": { backgroundColor: "gold" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
            marginTop: "5px",
          }}
          value="check"
          selected={showGeoCoder}
          onChange={() => {
            setShowGeoCoder(!showGeoCoder);
          }}
        >
          <ExploreIcon />
        </ToggleButton>
        <Collapse
          in={showGeoCoder}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {geoCoderZone}
        </Collapse>
      </div>

      <div
        className="col1row3"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "lightseagreen" },
            "&.Mui-selected:hover": { backgroundColor: "lightseagreen" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
            marginTop: "4px",
          }}
          value="check"
          selected={showAnimalSearch}
          onChange={() => {
            setShowAnimalSearch(!showAnimalSearch);
          }}
        >
          <SearchIcon />
        </ToggleButton>
        <Collapse
          in={showAnimalSearch}
          orientation="horizontal"
          collapsedSize="0px"
        >
          {animalSearchZone}
        </Collapse>
      </div>

      <div className="col1row4">
        {" "}
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "palegreen" },
            "&.Mui-selected:hover": { backgroundColor: "palegreen" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
          }}
          value="check"
          selected={divesTog}
          onChange={() => {
            setDivesTog(!divesTog);
          }}
        >
          <AnchorIcon />
        </ToggleButton>
      </div>

      <div className="col1row5">
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "orange" },
            "&.Mui-selected:hover": { backgroundColor: "orange" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
          }}
          value="check"
          selected={picModal}
          onChange={() => {
            setPicModal(togglePicModal);
          }}
        >
          <PhotoCameraIcon />
        </ToggleButton>
      </div>

      <div className="col1row6">
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "violet" },
            "&.Mui-selected:hover": { backgroundColor: "violet" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
          }}
          value="check"
          selected={diveSiteModal}
          onChange={() => {
            setDiveSiteModal(toggleAddDiveSiteModal);
          }}
        >
          <AddLocationAltIcon />
        </ToggleButton>
      </div>

      <div className="col1row7">
        <ToggleButton
          sx={{
            "&.Mui-selected": { backgroundColor: "pink" },
            "&.Mui-selected:hover": { backgroundColor: "pink" },
            "&:hover": { backgroundColor: "lightgrey" },
            backgroundColor: "lightgrey",
            height: "40px",
            width: "40px",
            border: "2px solid black",
          }}
          value="check"
          selected={guideModal}
          onChange={() => {
            setGuideModal(toggleGuideModal);
          }}
        >
          <QuestionMarkIcon />
        </ToggleButton>
      </div>

      
      <div className="col1rowB">
      <Collapse in={showAdminPortal} orientation="horizontal" collapsedSize="0px">
        {adminPortalZone}
      </Collapse>
        <Homeo   
        setShowAdminPortal={setShowAdminPortal}
        showAdminPortal={showAdminPortal}
        />
      </div>
      <div className="col2rowB">Want to see: {animalVal}</div>

      <div>
        <Home
          style={{
            position: "absolute",
            zIndex: "1",
            height: "100%",
          }}
        ></Home>
      </div>

      <FormModal openup={picModal} closeup={togglePicModal}>
        <PicUploader closeup={togglePicModal} />
      </FormModal>

      <FormModal openup={diveSiteModal} closeup={toggleAddDiveSiteModal}>
        <SiteSubmitter closeup={toggleAddDiveSiteModal} />
      </FormModal>

      <FormGuideModal openup={guideModal} closeup={toggleGuideModal}>
        <HowToGuide closeup={toggleGuideModal} />
      </FormGuideModal>
    </div>
  );
});

export default MapPage;
