import React, { useState, CSSProperties } from "react";

import Accordion from "../Accordion";
import SCU from "./ShouldComponentUpdate";
import Pure from "./PureComponent";
import Memo from "./Memo";

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

let memoObj = { outsideCount: 0 };
const App: React.FC = () => {
  const [{ sharedCount, parentCount, forceUpdate }, setState] = useState<
    IState
  >({
    sharedCount: 0,
    parentCount: 0,
    forceUpdate: true
  });
  memoObj.outsideCount = sharedCount;
  return (
    <div>
      <div style={section}>
        <label style={sectionLabel}>Parent Count:</label>
        <div>
          Parent Count: <span style={valueLabel}>{parentCount}</span>
        </div>
      </div>
      <Accordion className="accordion">
        <div data-header="Should Component Update:" className="accordion-item">
          <div style={section}>
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
        </div>
      </Accordion>

      <Accordion className="accordion">
        <div data-header="Memo" className="accordion-item">
          <div style={section}>
            <label style={sectionLabel}>Memo(new Obj):</label>
            <Memo innerObj={{ outsideCount: sharedCount }} />
          </div>

          <div style={section}>
            <label style={sectionLabel}>Memo(Same Obj):</label>
            <Memo innerObj={memoObj} />
          </div>
          <button onClick={() => (memoObj = { outsideCount: sharedCount })}>
            new memoObj
          </button>
        </div>
      </Accordion>

      <Accordion className="accordion">
        <div data-header="Reat.PureCompent:" className="accordion-item">
          <div style={section}>
            <Pure outsideCount={sharedCount} />
          </div>
        </div>
      </Accordion>

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
          &nbsp;
          <button
            onClick={() =>
              setState({
                sharedCount: 0,
                parentCount: 0,
                forceUpdate: true
              })
            }
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
