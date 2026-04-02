import React, { useState } from "react";
import "./App.css";

function App() {
  // Step 1: Create state
  const [count, setCount] = useState(0);

  // Step 2: Functions
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="container">
      <h1>Counter App</h1>

      <div className="counter">{count}</div>

      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default App;