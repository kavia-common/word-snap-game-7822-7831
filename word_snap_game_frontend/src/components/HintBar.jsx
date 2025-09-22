import React from "react";
import { useGame } from "../store/GameContext";

// PUBLIC_INTERFACE
export default function HintBar() {
  const { state } = useGame();
  const hint =
    state.status === "idle"
      ? "Press Start to begin. Select letters to form a word, then click Snap."
      : state.status === "paused"
      ? "Game paused. Resume to continue."
      : "Tip: Use Shuffle when stuck. Bonuses glow amber.";

  return <div className="hint-bar">{hint}</div>;
}
