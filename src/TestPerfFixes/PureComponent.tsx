import React from "react";

interface IProps {
  outsideCount: number;
}

export default class TestPure extends React.PureComponent<IProps> {
  render() {
    const { outsideCount } = this.props;
    return (
      <div>
        Test pure (Updates props change):
        {outsideCount}
      </div>
    );
  }
}
