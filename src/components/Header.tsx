import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import Box from "@mui/material/Box";

type Props = {};

const Header = (props: Props) => {
  return (
    <Box sx={{ maxHeight: "10vh" }}>
      <Typography variant="h3">Header</Typography>
    </Box>
  );
};

export default Header;
