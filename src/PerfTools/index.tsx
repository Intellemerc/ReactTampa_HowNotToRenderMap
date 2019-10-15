import React, { useState } from "react";

import Accordion from "../Accordion";
import ManySmallRenders from "./ManySmallRenders";
import OneLargeRender from "./OneLongRender";

interface IState {
  oneLargeForceRender;
}

export default () => {
  const [{ oneLargeForceRender }, setState] = useState<IState>({
    oneLargeForceRender: {}
  });
  return (
    <div>
      <Accordion className="accordion">
        <div data-header="Many small renders:" className="accordion-item">
          <ManySmallRenders />
          <div className="exampleImage">
            <img src="./ManySmallRenders.png" alt="ManySmall" />
          </div>
        </div>
      </Accordion>
      <Accordion className="accordion">
        <div data-header="One Long Render:" className="accordion-item">
          <OneLargeRender forceRender={oneLargeForceRender} />
          <button
            onClick={() => {
              setState({ oneLargeForceRender: {} });
            }}
          >
            ReRender
          </button>
          <div className="exampleImage">
            <img src="./OneLongRender.png" alt="OneLong" />
          </div>
        </div>
      </Accordion>
    </div>
  );
};
