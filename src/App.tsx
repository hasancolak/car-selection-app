import React from "react";
import "./App.scss";
import Cars from "./components/cars/cars";

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="app-content">
        <Cars></Cars>
      </div>
    </div>
  );
}

export default App;
