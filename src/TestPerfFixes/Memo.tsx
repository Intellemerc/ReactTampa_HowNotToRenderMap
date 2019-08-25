import React, { memo } from "react";

interface IInnerObj {
  outsideCount: number;
}
interface IProps {
  innerObj: IInnerObj;
}

const Memo: React.FC<IProps> = ({ innerObj }) => {
  return (
    <div>
      Test pure (Updates props change):&nbsp;
      <span
        style={{
          fontWeight: "bolder",
          fontSize: 16
        }}
      >
        {innerObj.outsideCount}
      </span>
    </div>
  );
};

export default memo(Memo);
