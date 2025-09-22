import React, { useMemo } from "react";
import { useGame } from "../store/GameContext";

function LetterCard({ card, onToggle }) {
  const { letter, selected, locked, bonus } = card;

  return (
    <button
      className={[
        "letter-card",
        selected ? "selected" : "",
        locked ? "locked" : "",
        bonus ? `bonus-${bonus}` : "",
      ].join(" ")}
      onClick={() => !locked && onToggle(card.id)}
      disabled={locked}
      aria-pressed={selected}
      aria-label={`Letter ${letter}${locked ? " locked" : ""}`}
    >
      <span className="letter">{letter}</span>
    </button>
  );
}

// PUBLIC_INTERFACE
export default function GameBoard() {
  const { state, toggle } = useGame();

  const sortedBoard = useMemo(() => {
    // keep locked first for consistent layout
    const locked = state.board.filter((c) => c.locked);
    const open = state.board.filter((c) => !c.locked);
    return [...locked, ...open];
  }, [state.board]);

  return (
    <main className="board-wrap">
      <div className="board">
        {sortedBoard.map((c) => (
          <LetterCard key={c.id} card={c} onToggle={toggle} />
        ))}
      </div>
    </main>
  );
}
