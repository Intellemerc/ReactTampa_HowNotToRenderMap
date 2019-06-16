import React, { useState } from "react";
import ClusterMap from "./Map/ClusterMap";
import "./App.css";

const App: React.FC = () => {
  const [form, setValues] = useState({
    maxPos: 1000
  });

  const updateForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues({
      maxPos: parseFloat(e.currentTarget.value)
    });
  };
  return (
    <div className="App">
      <div className="MaxPosInput">
        <input
          placeholder="Enter Max Positions"
          onChange={updateForm}
          value={form.maxPos}
        />
      </div>
      <ClusterMap maxPositions={form.maxPos} />
    </div>
  );
};

export default App;
