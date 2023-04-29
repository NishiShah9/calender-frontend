import Box from "@mui/system/Box";
import React from "react";
const headerStyle = {
  padding: "10px",
  textAlign: "center",
};
function Header() {
  return (
    <Box sx={headerStyle}>
      <h1>Calender Demo</h1>
    </Box>
  );
}

export default Header;
