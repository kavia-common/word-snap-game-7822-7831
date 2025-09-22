import React, { createContext, useContext, useMemo, useReducer } from "react";

// Types
const initialState = {
  round: 1,
  score: 0,
  highScore: 0,
  streak: 0,
  lives: 3,
  board: [], // array of cards/letters
  hand: [], // player hand if needed later
  status: "idle", // idle | playing | paused | over
  message: "",
};

function generateInitialBoard() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cards = Array.from({ length: 16 }, () => {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      letter,
      selected: false,
      locked: false,
      bonus: Math.random() < 0.15 ? "amber" : null, // accent bonus
    };
  });
  return cards;
}

const ACTIONS = {
  START: "START",
  TOGGLE_SELECT: "TOGGLE_SELECT",
  SUBMIT_WORD: "SUBMIT_WORD",
  SHUFFLE: "SHUFFLE",
  NEXT_ROUND: "NEXT_ROUND",
  RESET: "RESET",
  PAUSE: "PAUSE",
};

function calculateWordScore(word, selectedCount) {
  // Simple scoring: base length + small bonus if more tiles
  const base = word.length;
  const bonus = selectedCount >= 4 ? 3 : 0;
  return base + bonus;
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START: {
      return {
        ...state,
        status: "playing",
        board: generateInitialBoard(),
        message: "Make words by selecting letters and pressing Snap!",
      };
    }
    case ACTIONS.TOGGLE_SELECT: {
      const board = state.board.map((c) =>
        c.id === action.payload ? { ...c, selected: !c.selected } : c
      );
      return { ...state, board };
    }
    case ACTIONS.SUBMIT_WORD: {
      const selected = state.board.filter((c) => c.selected && !c.locked);
      const word = selected.map((c) => c.letter).join("");
      if (word.length < 2) {
        return { ...state, message: "Select at least 2 letters." };
      }

      // Note: Real validation should call backend dictionary API.
      const points = calculateWordScore(word, selected.length);
      const nextScore = state.score + points;
      const nextHigh = Math.max(state.highScore, nextScore);

      const updatedBoard = state.board.map((c) =>
        c.selected
          ? { ...c, locked: true, selected: false }
          : c
      );

      const remaining = updatedBoard.filter((c) => !c.locked);
      let finalBoard = updatedBoard;

      // If too few remaining, refresh some new cards for continued play
      if (remaining.length < 6) {
        const newCards = generateInitialBoard().slice(0, 10);
        // Keep locked ones and add new ones
        const locked = updatedBoard.filter((c) => c.locked);
        finalBoard = [...locked, ...newCards];
      }

      return {
        ...state,
        score: nextScore,
        highScore: nextHigh,
        streak: state.streak + 1,
        message: `Nice! “${word}” +${points}`,
        board: finalBoard,
      };
    }
    case ACTIONS.SHUFFLE: {
      const unlocked = state.board.filter((c) => !c.locked);
      for (let i = unlocked.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unlocked[i], unlocked[j]] = [unlocked[j], unlocked[i]];
      }
      const locked = state.board.filter((c) => c.locked);
      return { ...state, board: [...locked, ...unlocked], message: "Shuffled!" };
    }
    case ACTIONS.NEXT_ROUND: {
      const nextRound = state.round + 1;
      const refreshed = generateInitialBoard();
      return {
        ...state,
        round: nextRound,
        streak: 0,
        board: refreshed,
        message: `Round ${nextRound} — Fresh board!`,
      };
    }
    case ACTIONS.PAUSE: {
      return { ...state, status: state.status === "paused" ? "playing" : "paused" };
    }
    case ACTIONS.RESET: {
      return {
        ...initialState,
        board: generateInitialBoard(),
        status: "idle",
        message: "Game reset.",
      };
    }
    default:
      return state;
  }
}

const GameContext = createContext(null);

// PUBLIC_INTERFACE
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

// PUBLIC_INTERFACE
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    board: generateInitialBoard(),
  });

  const api = useMemo(
    () => ({
      state,
      start: () => dispatch({ type: ACTIONS.START }),
      toggle: (id) => dispatch({ type: ACTIONS.TOGGLE_SELECT, payload: id }),
      submit: () => dispatch({ type: ACTIONS.SUBMIT_WORD }),
      shuffle: () => dispatch({ type: ACTIONS.SHUFFLE }),
      nextRound: () => dispatch({ type: ACTIONS.NEXT_ROUND }),
      pause: () => dispatch({ type: ACTIONS.PAUSE }),
      reset: () => dispatch({ type: ACTIONS.RESET }),
    }),
    [state]
  );

  return <GameContext.Provider value={api}>{children}</GameContext.Provider>;
}
