import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Box
      sx={{
        flexDirection: "row",
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Button>Back</Button>
      <div>Breadcrumb</div>
    </Box>
  );
};

export default Footer;
