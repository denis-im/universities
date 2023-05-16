import React, { useContext } from "react";
import { StateContext } from "../contexts/StateContext";
import Button from "@mui/material/Button";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type Props = {};

// !!!! Decide if will use or remove !!!!
function toTitleCase(str: string) {
  return str;
  return str.replace(/\b\w+/g, function (s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
  });
}

const Footer = (props: Props) => {
  const { countries } = useContext(StateContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x)
    .map((p) => ({ path: p, label: p }));

  if (countries.length > 0 && pathnames.length > 0) {
    pathnames[0].label = countries.find(
      (c: CountryType) => c.alpha_two_code === pathnames[0].path
    ).country;
  }

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: "10px" }}
    >
      {pathnames[0] && (
        <Button variant="outlined" onClick={() => navigate("..")}>
          Back
        </Button>
      )}
      <Breadcrumbs aria-label="Breadcrumb">
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames
            .map((p) => p.path)
            .slice(0, index + 1)
            .join("/")}`;

          return last ? (
            <Typography color="textPrimary" key={to}>
              {toTitleCase(value.label)}
            </Typography>
          ) : (
            <Link color="inherit" component={RouterLink} to="/" key={to}>
              {toTitleCase(value.label)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
};

export default Footer;
