import React, { useState } from "react";

import SCU from "./ShouldComponentUpdate";
import Pure from "./PureComponent";

interface IState {
  sharedCount: number;
  parentCount: number;
  forceUpdate: boolean;
}
const App: React.FC = () => {
  const [{ sharedCount, parentCount, forceUpdate }, setState] = useState<
    IState
  >({
    sharedCount: 0,
    parentCount: 0,
    forceUpdate: false
  });
  return (
    <div className="App">
      <div>Parent Count: {parentCount}</div>
      <Pure outsideCount={sharedCount} />
      <div style={{ fontWeight: "bolder", fontSize: 24 }}>
        Reat.PureCompent:
      </div>

      <br />

      <div style={{ fontWeight: "bolder", fontSize: 24 }}>
        Should Component Update - Update:
      </div>
      <input
        type="radio"
        name="forceUpdate"
        value="false"
        checked={!forceUpdate}
        onClick={() =>
          setState({
            sharedCount: sharedCount,
            parentCount: parentCount,
            forceUpdate: false
          })
        }
      />
      <label>False</label>

      <input
        type="radio"
        name="forceUpdate"
        value="true"
        checked={forceUpdate}
        onClick={() =>
          setState({
            sharedCount: sharedCount,
            parentCount: parentCount,
            forceUpdate: true
          })
        }
      />
      <label>True</label>
      <SCU outsideCount={sharedCount} forceUpdate={forceUpdate} />

      <div style={{ fontWeight: "bolder", fontSize: 24 }}>Controls:</div>
      <button
        onClick={() =>
          setState({
            sharedCount: sharedCount + 1,
            parentCount: parentCount + 1,
            forceUpdate: forceUpdate
          })
        }
      >
        Update Shared Count and Parent
      </button>
      <br />
      <br />
      <button
        onClick={() =>
          setState({
            sharedCount: sharedCount,
            parentCount: parentCount + 1,
            forceUpdate: forceUpdate
          })
        }
      >
        Update Parent Only
      </button>
    </div>
  );
};

export default App;
