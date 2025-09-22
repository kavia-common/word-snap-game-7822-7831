import React, { useEffect } from "react";
import "./App.css";
import "./styles.css";
import NavBar from "./components/NavBar";
import GameBoard from "./components/GameBoard";
import ScoreSidebar from "./components/ScoreSidebar";
import HintBar from "./components/HintBar";
import { GameProvider } from "./store/GameContext";
import { applyCSSVariables } from "./theme";

// PUBLIC_INTERFACE
function App() {
  useEffect(() => {
    // apply theme variables on mount
    applyCSSVariables();
  }, []);

  return (
    <GameProvider>
      <div className="app-frame">
        <NavBar />
        <div className="content">
          <GameBoard />
          <ScoreSidebar />
        </div>
        <HintBar />
      </div>
    </GameProvider>
  );
}

export default App;
