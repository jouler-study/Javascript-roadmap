# React Class Component Lifecycle

React class components have a well-defined lifecycle, which is a series of methods that are invoked at different stages of a component’s existence. Understanding these methods helps you control what happens when a component mounts, updates, or unmounts.

---

## Lifecycle Phases

### 1. Mounting
These methods are called in order when an instance of a component is being created and inserted into the DOM:
- **constructor**
- **static getDerivedStateFromProps**
- **render**
- **componentDidMount**

### 2. Updating
An update can be caused by changes to props or state. These methods are called in order:
- **static getDerivedStateFromProps**
- **shouldComponentUpdate**
- **render**
- **getSnapshotBeforeUpdate**
- **componentDidUpdate**

### 3. Unmounting
This method is called when a component is being removed from the DOM:
- **componentWillUnmount**

### 4. Error Handling
These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component:
- **static getDerivedStateFromError**
- **componentDidCatch**

---

## Lifecycle Diagram

![React Lifecycle Diagram](https://preactjs.com/guide/components-lifecycle-diagram.png)

---

## Example: Basic Lifecycle Logging

Below is a class component that logs each lifecycle method.  
**See the comments to understand when each method is executed:**

```jsx
import React from "react";

class DemoLifecycle extends React.Component {
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
```

## References

- [React Docs: State and Lifecycle](https://react.dev/learn/state-a-components-memory)
- [React Docs: Lifecycle Methods](https://legacy.reactjs.org/docs/react-component.html)
- [React Lifecycle Methods Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)