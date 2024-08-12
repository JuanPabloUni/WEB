import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(true);
    setSeconds(0);
    intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')} mins ${String(seconds).padStart(2, '0')} secs`;
  };

  return (
    <div>
      <h2>Timer: {formatTime(seconds)}</h2>
      <Button onClick={startTimer} disabled={isActive}>
        Start
      </Button>
      <Button onClick={stopTimer} disabled={!isActive}>
        Stop
      </Button>
      <Button onClick={resetTimer} disabled={seconds === 0}>
        Reset
      </Button>
    </div>
  );
}

export default Timer;
