import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import "./formModal.css";

const style = {
  position: "absolute",
  width: "50%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#355D71",
  boxShadow: 24,
  p: 1.5,
  borderRadius: "15px",
};

const FormGuideModal = (props) => {
  const { openup, closeup, children } = props;

  return (
    <div>
      <Modal open={openup} onClose={closeup}>
        <Box sx={style}>
          <div className="modalBox" onClick={closeup}>
           X
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default FormGuideModal;
