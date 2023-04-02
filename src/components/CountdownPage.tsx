import { Cancel } from "@mui/icons-material";
import { Alert, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

interface CountdownPageProps {
  time: Number[];
  handleCountdown: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CountdownPage({
  time,
  handleCountdown,
}: CountdownPageProps) {
  const [countdown, setCountdown] = useState(calculateCountdown(time));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    if (countdown === 0) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [countdown]);

  return (
    <>
      <Typography variant="subtitle1" fontSize={28}>{`
        ${formatTime(countdown)[0]}h
        ${formatTime(countdown)[1]}m
        ${formatTime(countdown)[2]}s
      `}</Typography>
      <IconButton
        onClick={handleCountdown}
        aria-label="cancel"
        size="large"
        color="error"
      >
        <Cancel fontSize="large" />
      </IconButton>
      {countdown === 0 && (
        <Alert severity="info">The countdown has finished!</Alert>
      )}
    </>
  );
}

function calculateCountdown(time: Number[]): number {
  const sec = Number(time.slice(4, 6).join(""));
  const minInSec = Number(time.slice(2, 4).join("")) * 60;
  const hourInSec = Number(time.slice(0, 2).join("")) * 60 * 60;
  return sec + minInSec + hourInSec;
}

function formatTime(seconds: number): string[] {
  const res: string[] = [];

  for (let i = 0; i < 3; i++) {
    const val = seconds % 60;
    res.unshift(val < 10 ? "0" + val.toString() : val.toString());
    seconds = Math.floor(seconds / 60);
  }

  return res;
}
