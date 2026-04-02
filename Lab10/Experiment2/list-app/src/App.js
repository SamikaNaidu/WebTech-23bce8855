import React, { useState } from "react";
import "./App.css";

function App() {
  // State for list
  const [items, setItems] = useState([]);

  // State for input
  const [input, setInput] = useState("");

  // Add item
  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  // Remove item
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container">
      <h1>My List</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <p className="empty">No items yet</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={() => removeItem(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;