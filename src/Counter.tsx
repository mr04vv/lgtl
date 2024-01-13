import { FC, useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current value: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Click</button>
    </div>
  );
};
