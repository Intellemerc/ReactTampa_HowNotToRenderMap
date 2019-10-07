import React from "react";

interface IProps {
  forceRender: any;
}
const iterations = 100000;
const doNothing = () => {};
const Comp: React.FC<IProps> = () => {
  for (let i = 0; i < iterations; i++) {
    for (let j = 0; j < iterations; j++) {
      doNothing();
    }
  }
  return <div>Long render, last rendered at: {new Date().toTimeString()}</div>;
};

export default Comp;
