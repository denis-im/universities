import MainRouter from "./MainRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./assets/styles/App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DF0000",
    },
    secondary: {
      main: "#42a5f5",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        container: {
          backgroundColor: "transparent",
          color: "white",
        },
      },
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
