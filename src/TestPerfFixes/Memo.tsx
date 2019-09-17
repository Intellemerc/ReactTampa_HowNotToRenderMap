import React, { memo } from "react";

interface IInnerObj {
  outsideCount: number;
}
interface IProps {
  innerObj: IInnerObj;
}

const MyMemo: React.FC<IProps> = ({ innerObj }) => {
  return (
    <div>
      Test Memo (Updates props change):&nbsp;
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

export default memo(MyMemo);
