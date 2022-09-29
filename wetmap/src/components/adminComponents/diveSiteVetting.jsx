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
import { insertDiveSite } from "../../supabaseCalls/diveSiteSupabaseCalls";
// import { insertDiveSite } from "../../axiosCalls/diveSiteAxiosCalls";
import {
  diveSiteWaits,
  grabDiveSiteWaitById,
  deleteDiveSiteWait,
} from "../../supabaseCalls/diveSiteWaitSupabaseCalls";
// import {
//   diveSiteWaits,
//   grabDiveSiteWaitById,
//   deleteDiveSiteWait,
// } from "../../axiosCalls/diveSiteWaitAxiosCalls";


const DiveSiteVetting = React.memo(() => {

  const [diveSiteWait, setDiveSiteWait] = useState([]);
  let diveSitesToVett;
  let diveSiteById;

  useEffect(async () => {
    diveSitesToVett = await diveSiteWaits();
    diveSitesToVett ? setDiveSiteWait(diveSitesToVett) : [];
  }, []);

  const ValidateDiveSite = async (id) => {
    diveSiteById = await grabDiveSiteWaitById(id);
    diveSiteById
      ? insertDiveSite(diveSiteById[0]) && deleteDiveSiteWait(id)
      : [];
  };

  const RejectDiveSite = (id) => {
    deleteDiveSiteWait(id);
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
              <strong>Name</strong>
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
          {diveSiteWait &&
            diveSiteWait.map((site, index) => (
              <TableRow key={site.id} style={{ padding: 0 }}>
                <TableCell sx={{ color: "#2B2D42", paddingLeft: 5 }}contentEditable={true}>
                  <strong>{site.name}</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "#2B2D42" }}>
                  <strong>{site.lat}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <strong>{site.lng}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="primary" aria-label="add">
                    <TaskAltIcon onClick={() => ValidateDiveSite(site.id)} />
                  </Fab>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="secondary" aria-label="add">
                    <HighlightOffIcon onClick={() => RejectDiveSite(site.id)} />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default DiveSiteVetting;
