import { Container, Form, Label } from "reactstrap";
import { useContext, useState } from "react";
import Collapse from "@mui/material/Collapse";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { signOut } from "../../supabaseCalls/authenticateSupabaseCalls";
import { SessionContext } from "../contexts/sessionContext";
import "./settings.css";
import ActDelDialog from "./dialog";

const Settings = (props) => {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const dangerZone = (
    <div
      style={{
        height: "50px",
        width: "90%",
        color: "pink",
        borderRadius: "15px",
      }}
    >
      <div onClick={() => setOpenDialog(true)} className="AccountDeleteButton">
        <Label
          style={{
            fontFamily: "Caveat",
            color: "maroon",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          Delete Account
        </Label>
      </div>
    </div>
  );

  const handleLogout = async () => {
    await localStorage.removeItem("token");
    await signOut();
    setActiveSession(null);
  };

  return (
    <Container fluid>
      <Form>
        <div className="titleDiv2">
          <Label>
            <strong>Settings</strong>
          </Label>
        </div>

        <div onClick={handleLogout} className="Logoutbutton">
          <Label
            style={{
              fontFamily: "Caveat",
              color: "gold",
              cursor: "pointer",
              marginTop: "5px",
            }}
          >
            Sign Out
          </Label>
        </div>

        <div
          className="dangerZonebar"
          onDoubleClick={() => setShowDangerZone(!showDangerZone)}
        >
          <ErrorOutlineIcon
            sx={{
              color: "maroon",
              height: "28px",
              width: "28px",
              marginRight: "10%",
            }}
          ></ErrorOutlineIcon>
          <strong className="dangerText">Danger Zone</strong>
          <ErrorOutlineIcon
            sx={{
              color: "maroon",
              height: "28px",
              width: "28px",
              marginLeft: "10%",
            }}
          ></ErrorOutlineIcon>
        </div>

        <Collapse in={showDangerZone} orientation="vertical" collapsedSize="0px">
          {dangerZone}
        </Collapse>
      </Form>

      <ActDelDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      />
    </Container>
  );
};

export default Settings;
