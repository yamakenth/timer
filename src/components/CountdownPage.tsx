import { Cancel } from "@mui/icons-material";
import { Alert, CircularProgress, IconButton, Typography } from "@mui/material";
import { blueGrey, green, red, yellow } from "@mui/material/colors";
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

  const progress = (1 - countdown / calculateCountdown(time)) * 100;
  const progressColor =
    progress < 75 ? green[500] : progress < 90 ? yellow[500] : red[500];

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
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "220px",
          width: "220px",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: blueGrey[500],
          }}
          size="100%"
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: progressColor,
          }}
          size="100%"
        />
        <Typography variant="subtitle1" fontSize={28}>{`
          ${formatTime(countdown)[0]}h
          ${formatTime(countdown)[1]}m
          ${formatTime(countdown)[2]}s
        `}</Typography>
      </div>
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
