import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
  }

  render() {
    return (
      <div style={{ fontSize: "15rem" }}>
        <button style={{ fontSize: "10rem" }}>-</button>
        <span>{this.state.count}</span>
        <button style={{ fontSize: "10rem" }}>+</button>
      </div>
    );
  }
}

export default Counter;
