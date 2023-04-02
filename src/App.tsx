import {
  CssBaseline,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import InputPage from "./components/InputPage";
import CountdownPage from "./components/CountdownPage";
import { HourglassBottom } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const initialTime: Number[] = new Array(6).fill(0);

function App() {
  const [time, setTime] = useState(initialTime);
  const [countdown, setCountdown] = useState(false);

  function handleNumberInput(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const val = (event.target as Element).textContent;

    let newTime;
    if (val !== "00") {
      newTime = [...time, Number(val)].slice(1);
    } else {
      newTime = [...time, 0, 0].slice(2);
    }
    setTime(newTime);
  }

  function handleBackspace(): void {
    const newTime = [...time];
    newTime.unshift(0);
    newTime.pop();
    setTime(newTime);
  }

  function handleCountDown(): void {
    setCountdown(!countdown);
  }

  function handleKeypress(event: KeyboardEvent): void {
    if (event.code === "Enter" && !time.every((item) => item === 0)) {
      handleCountDown();
    }

    if (event.code === "Backspace") {
      const newTime = [...time];
      newTime.unshift(0);
      newTime.pop();
      setTime(newTime);
    }

    const key = parseInt(event.key);
    if (!isNaN(key)) {
      setTime([...time, key].slice(1));
    }
  }

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div
          style={{
            color: blue[50],
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "460px",
            width: "280px",
          }}
        >
          <header
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              marginBottom: "24px",
            }}
          >
            <HourglassBottom />
            <Typography variant="h5" component="h1">
              Timer
            </Typography>
          </header>
          {countdown ? (
            <CountdownPage time={time} handleCountdown={handleCountDown} />
          ) : (
            <InputPage
              time={time}
              handleNumberInput={handleNumberInput}
              handleBackspace={handleBackspace}
              handleCountdown={handleCountDown}
              handleKeypress={handleKeypress}
            />
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
