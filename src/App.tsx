import React from "react";
import "./assets/styles/App.css";

import ReactCountryFlag from "react-country-flag";

function App() {
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
