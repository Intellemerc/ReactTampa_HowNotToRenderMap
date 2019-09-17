import React from "react";

interface IProps {
  outsideCount: number;
}

export default class TestPure extends React.PureComponent<IProps> {
  render() {
    const { outsideCount } = this.props;
    return (
      <div>
        Test pure (Updates props change):&nbsp;
        <span
          style={{
            fontWeight: "bolder",
            fontSize: 16
          }}
        >
          {outsideCount}
          <br />
          Last updated at {new Date().toTimeString()}
        </span>
      </div>
    );
  }
}
