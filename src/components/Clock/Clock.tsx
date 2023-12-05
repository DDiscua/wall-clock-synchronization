import { useState, useEffect } from "react";
import "./Clock.css";
import { formatTime, transformTime } from "../../utils";

interface ClockProps {
  manualTime: string;
  onUpdateManualTime: (newTime: string) => void;
}

const Clock = ({ manualTime, onUpdateManualTime }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState(transformTime(manualTime));
  // console.log("timer", currentTime.toTimeString());
  console.log("manualTime NEW RENDER ", manualTime, formatTime(currentTime));

  useEffect(() => {
    console.log("onUpdateManualTime", manualTime);
    setCurrentTime(transformTime(manualTime));
  }, [onUpdateManualTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((time) => new Date(time.getTime() + 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [manualTime]);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const hourRotation = (hours % 12) * 30 + minutes / 2;
  const minuteRotation = minutes * 6;
  const secondRotation = seconds * 6;

  return (
    <div className="wall-watch">
      <svg width="200" height="200">
        {/* Clock face */}
        <circle cx={100} cy={100} r={90} fill="#f0f0f0" />

        {/* Hour hand */}
        <line
          x1={100}
          y1={100}
          x2={100}
          y2={60}
          stroke="#333"
          strokeWidth={6}
          strokeLinecap="round"
          transform={`rotate(${hourRotation} 100 100)`}
        />

        {/* Minute hand */}
        <line
          x1={100}
          y1={100}
          x2={100}
          y2={40}
          stroke="#555"
          strokeWidth={4}
          strokeLinecap="round"
          transform={`rotate(${minuteRotation} 100 100)`}
        />

        {/* Second hand */}
        <line
          x1={100}
          y1={100}
          x2={100}
          y2={30}
          stroke="red"
          strokeWidth={2}
          strokeLinecap="round"
          transform={`rotate(${secondRotation} 100 100)`}
        />
        {/* Display current time */}
        <text x={100} y={190} textAnchor="middle" fontSize="12" fill="#000">
          {formatTime(currentTime)}
        </text>
      </svg>
    </div>
  );
};

export { Clock };
