import React, { useState } from "react";

interface IState {
  updateCtn: number;
}
interface IProps {}

const iterations = 100;
let currentIteration = 0;
const ManySmallRenders: React.FC<IProps> = () => {
  const [{ updateCtn }, setState] = useState<IState>({ updateCtn: 0 });

  const bttnClick = () => {
    currentIteration = currentIteration + 1;
    if (currentIteration <= iterations) {
      setTimeout(() => {
        setState({ updateCtn: currentIteration });
        bttnClick();
      }, 25);
    } else if (currentIteration > iterations) {
      currentIteration = 0;
    }
  };
  return (
    <div>
      <div>Iterations: {iterations}</div>
      <div>Current Iterations: {updateCtn}</div>
      <button onClick={bttnClick}>Do Actions</button>
    </div>
  );
};

export default ManySmallRenders;
