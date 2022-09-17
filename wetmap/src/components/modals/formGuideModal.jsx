import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "reactstrap";
import "./formModal.css";

const style = {
  position: "absolute",
  width: "90%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgb(221, 226, 226)",
  border: "6px solid lightblue",
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
          <div className="modalBox">
            <Button
              style={{
                color: "#D8DBE2",
                backgroundColor: "maroon",
                boxShadow: "2px 2px 3px 1px rgb(131, 127, 127)",
              }}
              className="modalButton2"
              onClick={closeup}
            >
              X
            </Button>
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default FormGuideModal;
