import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import "./formModal.css";
import { PinContext } from "../contexts/pinContext";
import { PictureContext } from "../contexts/pictureContext";
import { removePhoto } from "../../supabaseCalls/uploadSupabaseCalls";
// import { removePhoto } from "../../axiosCalls/uploadAxiosCalls";
const style = {
  position: "absolute",
  width: "300px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#355D71",
  boxShadow: 24,
  p: 1.5,
  borderRadius: "25px",
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
          <div className="modalBox" onClick={handleClose}>
            X
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
});

export default FormModal;
