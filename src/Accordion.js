import React from "react";

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index:
        typeof props.selectedIndex !== "undefined" ? props.selectedIndex : -1
    };
    this.nodes = [];
  }

  componentWillReceiveProps(props) {
    if (
      typeof props.selectedIndex !== "undefined" &&
      this.state.index !== props.selectedIndex
    ) {
      this.toggle(props.selectedIndex);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  toggle(index, click) {
    clearTimeout(this.timeout);

    if (click) {
      if (this.props.onChange)
        this.props.onChange(
          index,
          this.state.index !== index,
          this.state.index !== index ? index : -1
        );
      if (!this.props.changeOnClick) return;
    }

    if (this.state.index > -1) {
      const content = this.nodes[this.state.index].ref.children[1];
      content.style.height = `${content.children[0].offsetHeight}px`; // Set fixed height before collapse of current open item
    }

    if (this.state.index === index || index === -1) {
      setTimeout(() => {
        this.setState({ index: -1 });
      }, 50);
    } else {
      setTimeout(() => {
        this.setState({ index });
        this.timeout = setTimeout(() => {
          this.nodes[index].ref.children[1].style.height = "auto"; // Set auto height after expand
        }, this.props.transitionDuration);
      }, 50);
    }
  }

  getHeight(index) {
    if (index === this.state.index) {
      return this.nodes.length > index
        ? this.nodes[index].ref.children[1].children[0].offsetHeight
        : "auto";
    }
    return 0;
  }

  render() {
    const style = {
      overflow: "hidden",
      transition: `height ${this.props.transitionDuration}ms ${this.props.transitionTimingFunction}`
    };
    const nodes = React.Children.map(this.props.children, (child, index) => (
      <div
        key={index}
        ref={div => {
          this.nodes[index] = { ref: div };
        }}
        className={this.state.index === index ? this.props.openClassName : ""}
      >
        <div onClick={() => this.toggle(index, true)}>
          {child.props["data-header"]}
        </div>
        <div style={{ ...style, height: this.getHeight(index) }}>{child}</div>
      </div>
    ));
    return <div className={this.props.className}>{nodes}</div>;
  }
}

Accordion.defaultProps = {
  transitionDuration: 500,
  transitionTimingFunction: "ease",
  openClassName: "open",
  changeOnClick: true
};

export default Accordion;
