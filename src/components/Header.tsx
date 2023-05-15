import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import Box from "@mui/material/Box";

type Props = {};

const Header = (props: Props) => {
  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ margin: "20px" }}>
        Universities App
      </Typography>
    </Box>
  );
};

export default Header;
