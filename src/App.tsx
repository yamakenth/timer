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
import "./App.css";
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

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="timer" style={{ color: blue[50] }}>
          <header>
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
            />
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
