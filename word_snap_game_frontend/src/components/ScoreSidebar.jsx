import React from "react";
import { useGame } from "../store/GameContext";

// PUBLIC_INTERFACE
export default function ScoreSidebar() {
  const { state, nextRound, shuffle, submit } = useGame();

  return (
    <aside className="sidebar">
      <section className="card">
        <h3 className="card-title">Score</h3>
        <div className="metrics">
          <div className="metric">
            <div className="metric-label">Current</div>
            <div className="metric-value">{state.score}</div>
          </div>
          <div className="metric">
            <div className="metric-label">High</div>
            <div className="metric-value amber">{state.highScore}</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="card-title">Progress</h3>
        <div className="list">
          <div className="list-row">
            <span>Round</span>
            <strong>{state.round}</strong>
          </div>
          <div className="list-row">
            <span>Streak</span>
            <strong>{state.streak}</strong>
          </div>
          <div className="list-row">
            <span>Lives</span>
            <strong>{state.lives}</strong>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="card-title">Actions</h3>
        <div className="action-row">
          <button className="btn btn-secondary" onClick={submit}>
            Snap word
          </button>
          <button className="btn btn-outline" onClick={shuffle}>
            Shuffle
          </button>
          <button className="btn btn-ghost" onClick={nextRound}>
            Next round
          </button>
        </div>
      </section>

      {state.message && (
        <section className="card message">
          <div className="message-text">{state.message}</div>
        </section>
      )}
    </aside>
  );
}
