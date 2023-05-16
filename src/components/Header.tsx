import React from "react";
import Box from "@mui/material/Box";
import Hat from "../assets/images/hat.png";
import Typography from "@mui/material/Typography";

type Props = {};

const Header = (props: Props) => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        margin: "auto",
        marginBottom: "0",
      }}
    >
      <img src={Hat} alt="University hat" style={{ height: 70 }} />
      <Typography variant="h4" align="center" sx={{ margin: "20px" }}>
        Universities App
      </Typography>
    </Box>
  );
};

export default Header;
