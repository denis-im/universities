import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateContextProvider } from "./contexts/StateContext";
import App from "./App";
import "./assets/styles/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </BrowserRouter>
);
