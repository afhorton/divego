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
import { insertphoto } from "../../axiosCalls/photoAxiosCalls";
import {
  photoWaits,
  grabPhotoWaitById,
  deletePhotoWait,
} from "../../axiosCalls/photoWaitAxiosCalls";

const PhotoVetting = React.memo(() => {
  const [photoWait, setPhotoWait] = useState([]);
  let photosToVett;
  let photoById;

  useEffect(async () => {
    photosToVett = await photoWaits();
    photosToVett ? setPhotoWait(photosToVett) : [];

    console.log("you need", photosToVett)
  }, []);

  const ValidatePhoto = async (id) => {
    photoById = await grabPhotoWaitById(id);
    photoById ? insertphoto(photoById[0]) && deletePhotoWait(id) : [];
  };

  const RejectPhoto = (id) => {
    deletePhotoWait(id);
  };

  return (
    <TableContainer
      style={{
        width: "90%",
        margin: "auto",
        borderRadius: "5px",
        marginTop: 30,
        boxShadow: "3px 4px 5px 1px rgb(99, 99, 99)",
      }}
    >
      <Table>
        <TableHead style={{ bacgroundColor: "#102E4A" }}>
          <TableRow>
            <TableCell
              style={{
                color: "black",
                width: 200,
                fontSize: 16,
                paddingLeft: 39,
              }}
            >
              <strong>Photo</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "black", width: 100, fontSize: 16 }}
            >
              <strong>Animal</strong>
            </TableCell>

            <TableCell
              align="center"
              style={{ color: "black", width: 100, fontSize: 16 }}
            >
              <strong>Date</strong>
            </TableCell>

            <TableCell
              align="center"
              style={{ color: "black", width: 100, fontSize: 16 }}
            >
              <strong>Latitude</strong>
            </TableCell>

            <TableCell
              align="center"
              style={{ color: "black", width: 100, fontSize: 16 }}
            >
              <strong>Longitude</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "black", width: 50, fontSize: 16 }}
            >
              <strong>Validate</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "black", width: 50, fontSize: 16 }}
            >
              <strong>Reject</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {photoWait &&
            photoWait.map((photo, index) => (
              <TableRow key={photo.id} style={{ padding: 0 }}>
                <TableCell
                  sx={{ color: "#2B2D42", paddingLeft: 5 }}
                  contentEditable={true}
                >
                  <strong>{photo.label}</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "#2B2D42" }}>
                  <strong>{photo.label}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <strong>{photo.dateTaken}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <strong>{photo.latitude}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <strong>{photo.longitude}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="primary" aria-label="add">
                    <TaskAltIcon onClick={() => ValidatePhoto(photo.id)} />
                  </Fab>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="secondary" aria-label="add">
                    <HighlightOffIcon onClick={() => RejectPhoto(photo.id)} />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default PhotoVetting;
