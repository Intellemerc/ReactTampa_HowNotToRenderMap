import React from "react";

interface IProps {
  forceRender: any;
}
const iterations = 100000;
const doNothing = () => {};
const SlowComp: React.FC<IProps> = () => {
  for (let i = 0; i < iterations; i++) {
    for (let j = 0; j < iterations; j++) {
      doNothing();
    }
  }
  return (
    <div>
      Long render, last rendered at:{" "}
      <span style={{ color: "red", fontWeight: "bold" }}>
        {new Date().toTimeString()}
      </span>
    </div>
  );
};

const FastCmp: React.FC<IProps> = () => {
  return (
    <div>
      Fast render, last rendered at:{" "}
      <span style={{ color: "red", fontWeight: "bold" }}>
        {new Date().toTimeString()}
      </span>
    </div>
  );
};

export default forceRender => (
  <>
    <FastCmp forceRender={forceRender} />
    <SlowComp forceRender={forceRender} />
  </>
);
