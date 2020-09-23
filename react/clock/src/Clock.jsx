import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [state, setState] = useState({
    date: new Date(),
  });

  const { date } = state;

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return (() => clearInterval(timerID))
  });


  const tick = () => {
    setState({
      date: new Date(),
    });
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
}