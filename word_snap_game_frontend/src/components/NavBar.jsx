import React from "react";
import { useGame } from "../store/GameContext";

function Brand() {
  return (
    <div className="brand">
      <div className="logo-dot" />
      <span className="brand-text">WordSnap</span>
    </div>
  );
}

// PUBLIC_INTERFACE
export default function NavBar() {
  const { state, start, pause, reset } = useGame();

  return (
    <header className="nav">
      <Brand />
      <nav className="nav-actions">
        <button
          className="btn btn-primary"
          onClick={start}
          aria-label="Start game"
        >
          ▶ Start
        </button>
        <button
          className="btn btn-ghost"
          onClick={pause}
          aria-label={state.status === "paused" ? "Resume game" : "Pause game"}
        >
          {state.status === "paused" ? "⏯ Resume" : "⏸ Pause"}
        </button>
        <button
          className="btn btn-outline"
          onClick={reset}
          aria-label="Reset game"
        >
          ↺ Reset
        </button>
      </nav>
    </header>
  );
}
