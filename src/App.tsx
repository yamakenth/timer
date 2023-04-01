import { CssBaseline, Theme, ThemeProvider, createTheme } from "@mui/material";
import React, { useState } from "react";
import InputPage from "./components/InputPage";

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
    const val = (event.target as Element).innerHTML;

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
    setCountdown(true);
  }

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>icon: Timer</div>
        {countdown ? (
          <div>{JSON.stringify(time)}</div>
        ) : (
          <InputPage
            time={time}
            handleNumberInput={handleNumberInput}
            handleBackspace={handleBackspace}
            handleCountdown={handleCountDown}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
