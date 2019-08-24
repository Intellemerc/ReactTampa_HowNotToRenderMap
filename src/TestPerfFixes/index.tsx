import React, { useState, CSSProperties } from "react";

import SCU from "./ShouldComponentUpdate";
import Pure from "./PureComponent";

interface IState {
  sharedCount: number;
  parentCount: number;
  forceUpdate: boolean;
}

const sectionLabel: CSSProperties = {
  fontWeight: "bolder",
  fontSize: 24
};
const section: CSSProperties = {
  padding: 15
};
const valueLabel: CSSProperties = {
  fontWeight: "bolder",
  fontSize: 16
};

const App: React.FC = () => {
  const [{ sharedCount, parentCount, forceUpdate }, setState] = useState<
    IState
  >({
    sharedCount: 0,
    parentCount: 0,
    forceUpdate: false
  });
  return (
    <div>
      <div style={section}>
        <label style={sectionLabel}>Parent Count:</label>
        <div>
          Parent Count: <span style={valueLabel}>{parentCount}</span>
        </div>
      </div>

      <div style={section}>
        <label style={sectionLabel}>Reat.PureCompent:</label>
        <Pure outsideCount={sharedCount} />
      </div>

      <div style={section}>
        <label style={sectionLabel}>Should Component Update - Update:</label>
        <div>
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
        </div>
        <SCU outsideCount={sharedCount} forceUpdate={forceUpdate} />
      </div>
      <div style={section}>
        <label style={sectionLabel}>Controls:</label>
        <div>
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
          &nbsp;
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
      </div>
    </div>
  );
};

export default App;
