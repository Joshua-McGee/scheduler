import  { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // this function keeps track of what mode we are in and tracks the previous history of mode
  // this is important because we need to be able to go back more than 1 page sometimes
  function transition(mode, replace = false) {
    setHistory([...history, mode]);
    setMode(mode);
    if (replace) {
      setHistory([initial])
    }
  }
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1]);
    }
    setMode(history[history.length - 1]);
  }
  return { mode, transition, back };
}