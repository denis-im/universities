import MainRouter from "./MainRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./assets/styles/App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B4949",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
}

export default App;
