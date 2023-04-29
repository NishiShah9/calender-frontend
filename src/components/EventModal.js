import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function EventModal({
  inputData,
  open,
  handleCloseModal,
  handleChange,
  handleInputEdit,
  handleCloseEvent,
  addInput,
  submitEvent,
}) {
  const [isError, setError] = useState(false); // error when input value is null unable to submit form

  /* handle submit fun on modal submit */
  const handleSubmit = () => {
    let isEmpty = inputData.filter((item) => item.value == "");
    if (isEmpty?.length > 0) {
      setError(true);
    } else {
      setError(false);
      submitEvent();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Events
        </Typography>
        {inputData.map((item, i) => {
          return (
            <Box
              sx={{
                padding: "5px",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              {item.showInput ? (
                <input
                  onChange={handleChange}
                  value={item.value}
                  id={i}
                  type={item.type}
                  size="40"
                />
              ) : (
                <Box sx={{ width: "100%" }} onClick={() => handleInputEdit(i)}>
                  {item.value}
                </Box>
              )}
              <HighlightOffIcon
                sx={{ color: "red" }}
                className="pointer"
                onClick={() => handleCloseEvent(i)}
              />
            </Box>
          );
        })}
        {isError && (
          <Box
            sx={{
              textAlign: "center",
            }}
            className="red-text"
          >
            Please Add Empty Events
          </Box>
        )}
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            paddingTop: "10px",
            gap: "8px",
          }}
        >
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={addInput}
          >
            Add
          </Button>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EventModal;
