import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import "./formModal.css";
import { PinContext } from "../contexts/pinContext";
import { PictureContext } from "../contexts/pictureContext";
import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
const style = {
  position: "absolute",
  width: 300,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgb(221, 226, 226)",
  border: "6px solid lightblue",
  boxShadow: 24,
  p: 1.5,
  borderRadius: "15px",
};

let filePath = "./wetmap/src/components/uploads/";

const FormModal = React.memo((props) => {
  const { openup, closeup, children } = props;
  const { setPin } = useContext(PinContext);

  const { photoFile, setPhotoFile } = useContext(PictureContext);
  

  const handleClose = () => {
    setPin({
      PicFile: "",
      Animal: "",
      PicDate: "",
      Latitude: "",
      Longitude: "",
    });
    if (photoFile){
      removePhoto({filePath: filePath, fileName: photoFile})
    }
    setPhotoFile(null)
    
    closeup();
  };

  return (
    <div>
      <Modal open={openup} onClose={closeup}>
        <Box sx={style}>
          <div className="modalBox">
            <Button
              style={{
                color: "#D8DBE2",
                backgroundColor: "maroon",
                boxShadow: "2px 2px 3px 1px rgb(131, 127, 127)",
                marginTop: 10,
                marginRight: 5,
                cursor: "pointer"
              }}
              className="modalButton2"
              onClick={handleClose}
            >
              X
            </Button>
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
});

export default FormModal;
