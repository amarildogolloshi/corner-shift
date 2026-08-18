# Corner Shift

**Corner Shift** is a browser-based sliding tile puzzle game built with **HTML**, **CSS**, and **JavaScript**.

The goal is simple: move each tile to its matching corner gate and slide it out of the board. Red tiles exit through the red gate, and white tiles exit through the white gate.

## Play

Play the game here:
https://amarildogolloshi.github.io/corner-shift/

## Game Preview

Corner Shift uses a 5x5 board filled with red and white tiles. Each game randomly chooses one exit side for each corner:

- The red gate appears on either the top or left side of the top-left corner.
- The white gate appears on either the bottom or right side of the bottom-right corner.

Tiles can slide through empty spaces, but they cannot jump over other tiles.

## Features

- 5x5 sliding tile puzzle board
- Red and white tile system
- Randomized gate direction for each new game
- Full board generation with 25 starting tiles
- Smooth sliding animation
- Drag, swipe, and tap support
- Mobile-friendly touch controls
- Multi-cell sliding when the path is clear
- Gate-based exit logic
- Move counter
- Tiles-left counter
- Simple HTML, CSS, and JavaScript structure

## How to Play

1. Start with a full 5x5 board.
2. Red tiles belong to the red gate.
3. White tiles belong to the white gate.
4. Slide a tile in a straight line if the path is clear.
5. A tile can move only through empty spaces after the first exit creates space.
6. To remove a tile from the board:
   - The tile must match the gate color.
   - The tile must be aligned with the correct gate line.
   - The path to the corner must be clear.
   - Slide the tile toward the border gate.
7. Clear all tiles to win.

## Controls

### Desktop

- Click or drag a tile.
- Drag in the direction you want the tile to move.
- If the path is clear, the tile will slide.

### Mobile

- Tap and swipe a tile.
- Swipe up, down, left, or right.
- If the path is clear, the tile will slide.

## Project Structure

```text
corner-shift/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Files

### `index.html`

Contains the basic page structure for the game, including:

- Game title
- Instructions
- Move counter
- Tiles-left counter
- Board container
- New Game button
- Script and stylesheet links

### `styles.css`

Contains all visual styling, including:

- Board layout
- Tile colors
- Gate markers
- Drag and slide effects
- Mobile responsiveness

### `script.js`

Contains the game logic, including:

- Board generation
- Random gate selection
- Tile movement
- Drag and swipe controls
- Multi-cell slide logic
- Exit logic
- Move counting
- Win detection

## Installation

No build tools are required. This project runs directly in the browser.

### Option 1: Open directly

1. Download or clone the project.
2. Open `index.html` in your browser.

### Option 2: Run with a local server

If you are using Node.js, you can serve the project with a simple local server.

```bash
npx serve .
```

Or, if your project has a custom `server.js` file:

```bash
npm install
npm start
```

## GitHub Pages Deployment

You can publish this project with GitHub Pages:

1. Push the project to a GitHub repository.
2. Go to **Settings**.
3. Open **Pages**.
4. Choose the branch you want to deploy, usually `main`.
5. Select the root folder.
6. Save the settings.
7. GitHub will generate a live URL for the game.

## Game Logic Summary

The board starts with all 25 cells filled. The first empty cell is created when a matching corner tile exits through its gate.

After that, the player can use the empty space to slide other tiles around the board. A tile may slide across multiple empty spaces in a straight line, but only if every space in front of it is clear.

A tile exits only when it matches the gate color and is moved through the correct border gate.

## Future Improvements

Possible features to add later:

- Level system
- Timer
- Best score tracking
- Sound effects
- Undo button
- Restart current board button
- Difficulty modes
- Puzzle generator with guaranteed solvable boards
- Animations when a tile exits
- Dark/light theme toggle

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

## License

This project is open source. You can use, modify, and share it freely.


