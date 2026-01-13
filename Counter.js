// Counter.js
import React, { useState, useCallback } from 'react';

const Counter = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue);
  const [history, setHistory] = useState([]);
  
  // Incorrect dependency array - BUG 4
  const increment = useCallback(() => {
    setCount(count + 1);
    setHistory([...history, count + 1]);
  }, [count, history]);
  
  const decrement = useCallback(() => {
    setCount(count - 1);
    setHistory([...history, count - 1]);
  }, [count, history]);
  
  const reset = () => {
    setCount(0);
    setHistory([]);
  };
  
  return (
    <div className="counter">
      <h3>Counter: {count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <div>
        <h4>History:</h4>
        <ul>
          {history.map((item, index) => (
            // Missing key prop - Warning
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;
