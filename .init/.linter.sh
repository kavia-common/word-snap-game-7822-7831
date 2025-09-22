#!/bin/bash
cd /home/kavia/workspace/code-generation/word-snap-game-7822-7831/word_snap_game_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

