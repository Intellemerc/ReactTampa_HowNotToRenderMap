import React, { useState, useEffect } from "react";

import MapContainer from "./Map/MapContainer";
import { useDebounce } from "use-debounce";

const setIntervalAsync = (fn: any, ms: number) => {
  fn().then(() => {
    setTimeout(() => setIntervalAsync(fn, ms), ms);
  });
};

let intervalActive = false;
const MapTester: React.FC = () => {
  //setup state for number of positions
  const [form, setValues] = useState({
    maxPos: 1000
  });
  const [itemsToUpdate, setItemsToUpdate] = useState<Array<number> | undefined>(
    undefined
  );

  const updateForm = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues({
      maxPos: parseFloat(e.currentTarget.value)
    });
  };

  const debounceMaxPos = useDebounce<number>(form.maxPos, 1000);

  useEffect(() => {
    let itu = itemsToUpdate;
    if (intervalActive) return;
    intervalActive = true;
    console.log("Setting up refresh interval");
    setIntervalAsync(async () => {
      if (!itu) {
        itu = Array.from(Array(250).keys());
      }
      itu = itu.map(() => Math.floor(Math.random() * form.maxPos));
      //console.log(`updating ${itu.length} items`);

      setItemsToUpdate(itu);
    }, 3000);
  }, [itemsToUpdate]);

  return (
    <div style={{ height: "75%" }}>
      <div className="MaxPosInput" style={{ textAlign: "center" }}>
        <label>Max Positions:&nbsp; </label>
        <input
          type="number"
          min="0"
          max="100000"
          step="1000"
          onChange={updateForm}
          value={form.maxPos}
        />
      </div>
      <MapContainer
        maxPositions={debounceMaxPos[0]}
        updateList={itemsToUpdate}
      />
    </div>
  );
};
export default MapTester;
