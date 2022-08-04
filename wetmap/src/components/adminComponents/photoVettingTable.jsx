import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PhotoListItem from "./photoListItem";
import { photoWaits } from "../../axiosCalls/photoWaitAxiosCalls";

const PhotoVettingTable = React.memo(() => {
  const [photoWait, setPhotoWait] = useState([]);
  let photosToVett;

  useEffect(async () => {
    photosToVett = await photoWaits();
    photosToVett ? setPhotoWait(photosToVett) : [];

  }, []);

  let list;
  if (photoWait && photoWait.length > 0) {
    list = photoWait.map((photo) => {
      return (
        <PhotoListItem
          key={photo.id}
          photoFile={photo.photofile}
          animal={photo.label}
          date={photo.datetaken}
          lat={photo.latitude}
          lng={photo.longitude}
        />
      );
    });
  } else {
    list = "";
  }

  return (
    <ul id="photoList" style={{ marginBottom: "0px" }}>
      <div className="listHeader2">
        <p style={{ minWidth: "40px", marginLeft: "10px", color: "#3B747D" }}>
          <strong>Photo</strong>
        </p>
        <p style={{ minWidth: "127px", marginLeft: "10px", color: "#3B747D" }}>
          <strong>Animal</strong>
        </p>
        <p style={{ minWidth: "90px", marginLeft: "-5px", color: "#3B747D" }}>
          <strong>Date</strong>
        </p>
        <p style={{ minWidth: "160px", marginLeft: "10px", color: "#3B747D" }}>
          <strong>Latitude</strong>
        </p>
        <p style={{ minWidth: "183px", marginLeft: "0px", color: "#3B747D" }}>
          <strong>Longitude</strong>
        </p>
        <p style={{ minWidth: "183px", marginLeft: "0px", color: "#3B747D" }}>
          <strong>Validate</strong>
        </p>
        <p style={{ minWidth: "183px", marginLeft: "0px", color: "#3B747D" }}>
          <strong>Reject</strong>
        </p>
      </div>
      <p>{list}</p>
    </ul>
  );
});

export default PhotoVettingTable;
