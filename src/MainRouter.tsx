import { useContext } from "react";
import { StateContext } from "./contexts/StateContext";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Countries from "./components/Countries";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Footer from "./components/Footer";
import Universities from "./components/Universities";
import University from "./components/University";

function Layout() {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

const MainRouter = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Countries />} />
        <Route path="/:code" element={<Universities />} />
        <Route path="/:code/:uni" element={<University />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
