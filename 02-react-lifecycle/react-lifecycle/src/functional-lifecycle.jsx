import React, { useState, useEffect } from "react";

export function FunctionalLifeCycle() {
  // 1. State initialization - management
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