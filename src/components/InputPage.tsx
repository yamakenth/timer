import React from "react";

const inputValues: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "00",
  "0",
];

interface InputPageProps {
  time: Number[];
  handleNumberInput: React.MouseEventHandler<HTMLButtonElement>;
  handleBackspace: React.MouseEventHandler<HTMLButtonElement>;
  handleCountdown: React.MouseEventHandler<HTMLButtonElement>;
}

export default function inputPage({
  time,
  handleNumberInput,
  handleBackspace,
  handleCountdown,
}: InputPageProps) {
  return (
    <>
      <div>icon: Timer</div>
      <div>{`
      ${time.slice(0, 2).join("")}h
      ${time.slice(2, 4).join("")}m
      ${time.slice(4, 6).join("")}s`}</div>
      <div>
        {inputValues.map((val, idx) => (
          <button key={idx} onClick={handleNumberInput}>
            {val}
          </button>
        ))}
        <button onClick={handleBackspace}>&lt;</button>
      </div>
      <button onClick={handleCountdown}>Go</button>
    </>
  );
}
