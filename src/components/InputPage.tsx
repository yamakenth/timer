import React from "react";
import { Button, IconButton, Typography } from "@mui/material";
import { Backspace, PlayCircleFilled } from "@mui/icons-material";

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
      <Typography
        variant="subtitle1"
        fontSize={36}
        style={{ marginBottom: "16px" }}
      >{`
        ${time.slice(0, 2).join("")}h
        ${time.slice(2, 4).join("")}m
        ${time.slice(4, 6).join("")}s
      `}</Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px 20px",
          marginBottom: "16px",
        }}
      >
        {inputValues.map((val, idx) => (
          <Button
            variant="text"
            size="large"
            key={idx}
            onClick={handleNumberInput}
            style={{ fontSize: 18 }}
          >
            {val}
          </Button>
        ))}
        <Button
          variant="text"
          size="large"
          onClick={handleBackspace}
          aria-label="delete"
          color="primary"
        >
          <Backspace />
        </Button>
      </div>
      <IconButton
        onClick={handleCountdown}
        aria-label="start"
        size="large"
        disabled={time.every((item) => item === 0)}
        color="success"
      >
        <PlayCircleFilled fontSize="large" />
      </IconButton>
    </>
  );
}
