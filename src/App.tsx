import React from "react";
import "./App.css";

import Map from "./MapTestBed";
import PerTests from "./TestPerfFixes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Map />
      {/* <PerTests /> */}
    </div>
  );
};

export default App;
