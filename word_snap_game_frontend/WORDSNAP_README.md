# Word Snap Frontend (Ocean Professional)

A modern, minimalist React UI for a word-based card game. It features:
- Navigation header
- Central game board
- Score sidebar
- Smooth transitions and ocean (blue) + amber accents

Run:
- npm start
- npm run build
- npm test

Structure:
- src/theme.js: Theme constants and CSS variables helper
- src/store/GameContext.js: Global game store (React Context)
- src/components/NavBar.jsx: Top navigation and controls
- src/components/GameBoard.jsx: Letter grid and interactions
- src/components/ScoreSidebar.jsx: Scoring and actions
- src/components/HintBar.jsx: Contextual hints
- src/styles.css: Main styles following Ocean Professional
- src/App.js: Page layout composition

Notes:
- No env vars required. Backend integration can be added to GameContext (e.g., dictionary validation, sessions).
