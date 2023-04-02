import React, { useState, useEffect } from "react";
import PhotoListItem from "./photoListItem";
import { photoWaits } from "../../supabaseCalls/photoWaitSupabaseCalls";
import "./photoVetting.css"

const PhotoVettingTable = React.memo(() => {
  const [photoWait, setPhotoWait] = useState([]);
  let photosToVett;

  useEffect(async () => {
    photosToVett = await photoWaits();
    photosToVett ? setPhotoWait(photosToVett) : [];

  }, []);

  let list;
  if (photoWait && photoWait.length > 0) {
    list = photoWait && photoWait.map((photo) => {

      return (
        <PhotoListItem
          key={photo.id}
          id={photo.id}
          photoFile={photo.photoFile}
          animal={photo.label}
          date={photo.dateTaken}
          lat={photo.latitude}
          lng={photo.longitude}
          setPhotoWait={setPhotoWait}
        />
      );
    });
  } else {
    list = "";
  }

  return (
    <ul id="photoList">
      <div className="listHeader">
        <h3 style={{ minWidth: "175px",  color: "#3B747D" }}>
          <strong>Photo</strong>
        </h3>
        <h3 style={{ minWidth: "260px",  color: "#3B747D" }}>
          <strong>Information</strong>
        </h3>
        <div style={{display: 'flex'}}>
        <h3 style={{ minWidth: "105px",  color: "#3B747D" }}>
          <strong>Validate</strong>
        </h3>
        <h3 style={{ minWidth: "105px", color: "#3B747D" }}>
          <strong>Reject</strong>
        </h3>
        </div>
      </div>
      <p>{list}</p>
    </ul>
  );
});

export default PhotoVettingTable;
