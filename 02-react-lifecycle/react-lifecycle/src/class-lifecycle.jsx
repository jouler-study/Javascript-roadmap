import React from "react";

export class ClassLifeCycle extends React.Component {
  // 1. Called first, before mounting
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = { count: 0 };
  }

  // 2. Called before every render (on mount and update)
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  // 3. Called after the first render (only once, after mounting)
  componentDidMount() {
    console.log("componentDidMount");
  }

  // 4. Called before every re-render (on update, not on mount)
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true; // If false, render/update is skipped
  }

  // 5. Called before the DOM is updated (on update, not on mount)
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return null;
  }

  // 6. Called after the DOM is updated (on update, not on mount)
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
  }

  // 7. Called right before the component is removed from the DOM
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  // Called on every render (mount and update)
  render() {
    console.log("render");
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}