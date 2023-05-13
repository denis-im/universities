import React, { useEffect, useContext } from "react";
import { StateContext } from "./contexts/StateContext";
import { getAllData } from "./api/api-uni";
import "./assets/styles/App.css";

import ReactCountryFlag from "react-country-flag";

function App() {
  const { allData, setAllData, countries } = useContext(StateContext);

  useEffect(() => {
    (async () => {
      const data = await getAllData();
      setAllData(data);
    })();
    // We fetch data only on startup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Universities</h1>
        <ReactCountryFlag
          className="emojiFlag"
          countryCode="US"
          style={{
            fontSize: "2em",
            lineHeight: "2em",
          }}
          aria-label="United States"
        />
      </header>
    </div>
  );
}

export default App;
