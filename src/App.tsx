import React, { useState } from "react";
import Map from "./Map/Map";
import "./App.css";
import { useDebounce } from "use-debounce";

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
  const debounceMaxPos = useDebounce<number>(form.maxPos, 1000);
  return (
    <div className="App">
      <div className="MaxPosInput">
        <input
          type="number"
          min="0"
          max="100000"
          step="1000"
          onChange={updateForm}
          value={form.maxPos}
        />
      </div>
      <Map maxPositions={debounceMaxPos[0]} />
    </div>
  );
};

export default App;
