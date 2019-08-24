import React from "react";

interface IProps {
  outsideCount: number;
  forceUpdate: boolean;
}

export default class TestPure extends React.Component<IProps> {
  shouldComponentUpdate(newProps) {
    return newProps.forceUpdate;
  }
  render() {
    const { outsideCount } = this.props;
    return (
      <div>
        Test pure (only updates when forced to update):
        {outsideCount}
      </div>
    );
  }
}
