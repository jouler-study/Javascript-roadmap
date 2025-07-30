# React Functional Component Lifecycle

With the introduction of React Hooks, functional components can now manage state and side effects, covering all lifecycle needs previously exclusive to class components.

---

## Key Hooks for Lifecycle

- **useState:** Manage local state.
- **useEffect:** Handle side effects (similar to componentDidMount, componentDidUpdate, and componentWillUnmount).
- **useLayoutEffect:** Like useEffect, but fires synchronously after all DOM mutations.
- **useRef:** Persist values across renders without causing re-renders.

---

## useEffect Lifecycle Patterns

| Class Component                | Functional Component (useEffect)                |
|------------------------------- |------------------------------------------------|
| componentDidMount              | useEffect(() => { ... }, [])                   |
| componentDidUpdate             | useEffect(() => { ... }, [deps])               |
| componentWillUnmount           | useEffect(() => { return () => { ... } }, [])  |

---

## Example: Basic useEffect Lifecycle Logging

```jsx
import React, { useState, useEffect } from "react";

function DemoFunctionalLifecycle() {
  const [count, setCount] = useState(0);

  // Runs once on mount
  useEffect(() => {
    console.log("componentDidMount (useEffect [])");
    return () => {
      console.log("componentWillUnmount (cleanup)");
    };
  }, []);

  // Runs on every update (including mount)
  useEffect(() => {
    console.log("componentDidUpdate or Mount (useEffect no deps)");
  });

  // Runs when count changes
  useEffect(() => {
    console.log("componentDidUpdate: count changed");
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## References

- [React Docs: Using the Effect Hook](https://react.dev/reference/react/useEffect)
- [React Docs: State Hook](https://react.dev/reference/react/useState)