const SIZE = 5;
const SLIDE_TIME = 180;
const EXIT_TIME = 180;
const DRAG_START_DISTANCE = 6;
const MOVE_COMMIT_DISTANCE = 25;

const boardElement = document.getElementById("board");
const newGameBtn = document.getElementById("newGameBtn");
const messageElement = document.getElementById("message");
const movesElement = document.getElementById("moves");
const leftElement = document.getElementById("left");

let board = [];
let selected = null;
let moves = 0;
let isAnimating = false;
let redExitSide = "top";
let whiteExitSide = "bottom";
let pointerStart = null;
let draggingTile = null;
let dragFrom = null;
let hasDragged = false;

function randomColor() {
    return Math.random() < 0.5 ? "red" : "white";
}

function randomExitSides() {
    redExitSide = Math.random() < 0.5 ? "top" : "left";
    whiteExitSide = Math.random() < 0.5 ? "bottom" : "right";
}

function updateGateClasses() {
    boardElement.classList.remove("red-gate-top", "red-gate-left", "white-gate-bottom", "white-gate-right");
    boardElement.classList.add(`red-gate-${redExitSide}`);
    boardElement.classList.add(`white-gate-${whiteExitSide}`);
}

function createBoard() {
    board = [];
    randomExitSides();
    updateGateClasses();

    for (let row = 0; row < SIZE; row++) {
        board[row] = [];
        for (let col = 0; col < SIZE; col++) {
            board[row][col] = randomColor();
        }
    }

    board[0][0] = "red";
    board[SIZE - 1][SIZE - 1] = "white";

    selected = null;
    moves = 0;
    isAnimating = false;
    pointerStart = null;
    draggingTile = null;
    dragFrom = null;
    hasDragged = false;

    setMessage("");
    render();
}

function render() {
    boardElement.innerHTML = "";
    let tilesLeft = 0;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = String(row);
            cell.dataset.col = String(col);

            if (row === 0 && col === 0) cell.classList.add("red-corner");
            if (row === SIZE - 1 && col === SIZE - 1) cell.classList.add("white-corner");
            if (!board[row][col]) cell.classList.add("empty-space");

            const color = board[row][col];
            if (color) {
                tilesLeft++;
                const tile = document.createElement("div");
                tile.className = `tile ${color}`;
                tile.dataset.row = String(row);
                tile.dataset.col = String(col);

                if (selected && selected.row === row && selected.col === col) {
                    tile.classList.add("selected");
                }

                tile.addEventListener("pointerdown", handlePointerDown);
                tile.addEventListener("pointermove", handlePointerMove);
                tile.addEventListener("pointerup", handlePointerUp);
                tile.addEventListener("pointercancel", cancelDrag);
                tile.addEventListener("lostpointercapture", cancelDrag);
                cell.appendChild(tile);
            }

            cell.addEventListener("pointerup", function () {
                handleEmptyCellTap(row, col);
            });

            boardElement.appendChild(cell);
        }
    }

    updateStats(tilesLeft);
    if (tilesLeft === 0) setMessage(`You cleared the board in ${moves} moves!`);
}

function handlePointerDown(event) {
    if (isAnimating) return;
    const tile = event.currentTarget;
    if (tile.setPointerCapture) tile.setPointerCapture(event.pointerId);
    pointerStart = { x: event.clientX, y: event.clientY };
    dragFrom = { row: Number(tile.dataset.row), col: Number(tile.dataset.col) };
    draggingTile = tile;
    hasDragged = false;
}

function handlePointerMove(event) {
    if (isAnimating) return;
    if (!pointerStart || !draggingTile || !dragFrom) return;

    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < DRAG_START_DISTANCE) return;

    const directExit = getDirectGateLineExit(dx, dy, dragFrom.row, dragFrom.col);
    if (directExit) {
        hasDragged = true;
        draggingTile.classList.add("dragging");
        moveTileVisually(dx, dy, true, directExit.stepsToExit);
        clearDropTargets();
        return;
    }

    const slideTarget = getSlideTargetFromDrag(dx, dy, dragFrom.row, dragFrom.col);
    if (!slideTarget) {
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
        clearDropTargets();
        return;
    }

    hasDragged = true;
    draggingTile.classList.add("dragging");
    moveTileVisually(dx, dy, false, slideTarget.steps);
    highlightDropTarget(slideTarget.row, slideTarget.col);
}

function handlePointerUp(event) {
    if (isAnimating) {
        cancelDrag();
        return;
    }

    if (!pointerStart || !draggingTile || !dragFrom) {
        cancelDrag();
        return;
    }

    event.stopPropagation();

    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    clearDropTargets();

    if (!hasDragged || Math.max(absX, absY) < MOVE_COMMIT_DISTANCE) {
        resetDraggedTile();
        selected = { row: dragFrom.row, col: dragFrom.col };
        clearPointerState();
        render();
        return;
    }

    const directExit = getDirectGateLineExit(dx, dy, dragFrom.row, dragFrom.col);
    if (directExit) {
        const fromRow = dragFrom.row;
        const fromCol = dragFrom.col;
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
        clearPointerState();
        animateExit(fromRow, fromCol, directExit.exitRow, directExit.exitCol);
        return;
    }

    const slideTarget = getSlideTargetFromDrag(dx, dy, dragFrom.row, dragFrom.col);
    if (slideTarget) {
        const fromRow = dragFrom.row;
        const fromCol = dragFrom.col;
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
        clearPointerState();
        animateMove(fromRow, fromCol, slideTarget.row, slideTarget.col);
    } else {
        resetDraggedTile();
        clearPointerState();
    }
}

function handleEmptyCellTap(row, col) {
    if (isAnimating) return;
    if (board[row][col]) return;
    if (!selected) return;
    tryMove(selected.row, selected.col, row, col);
}

function tryMove(fromRow, fromCol, toRow, toCol) {
    if (!canMove(fromRow, fromCol, toRow, toCol)) return;
    animateMove(fromRow, fromCol, toRow, toCol);
}

function canMove(fromRow, fromCol, toRow, toCol) {
    if (!isInsideBoard(fromRow, fromCol)) return false;
    if (!isInsideBoard(toRow, toCol)) return false;
    if (!board[fromRow][fromCol]) return false;
    if (board[toRow][toCol]) return false;
    if (fromRow !== toRow && fromCol !== toCol) return false;
    if (fromRow === toRow && fromCol === toCol) return false;
    return isPathClear(fromRow, fromCol, toRow, toCol);
}

function isPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = Math.sign(toRow - fromRow);
    const colStep = Math.sign(toCol - fromCol);
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
        if (board[currentRow][currentCol]) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }

    return !board[toRow][toCol];
}

function getDirectGateLineExit(dx, dy, startRow, startCol) {
    const direction = getDirectionFromDrag(dx, dy);
    const color = board[startRow][startCol];
    if (!color) return null;

    let corner = null;
    let exit = null;
    let requiredDirection = null;

    if (color === "red") {
        corner = { row: 0, col: 0 };
        exit = getManualExitTarget(corner.row, corner.col, color);
        requiredDirection = redExitSide === "top"
            ? { rowStep: -1, colStep: 0, axis: "y" }
            : { rowStep: 0, colStep: -1, axis: "x" };
    }

    if (color === "white" || color === "black") {
        corner = { row: SIZE - 1, col: SIZE - 1 };
        exit = getManualExitTarget(corner.row, corner.col, color);
        requiredDirection = whiteExitSide === "bottom"
            ? { rowStep: 1, colStep: 0, axis: "y" }
            : { rowStep: 0, colStep: 1, axis: "x" };
    }

    if (!corner || !exit || !requiredDirection) return null;

    if (direction.rowStep !== requiredDirection.rowStep || direction.colStep !== requiredDirection.colStep) {
        return null;
    }

    if (!isAlignedWithGateLine(startRow, startCol, corner.row, corner.col, requiredDirection)) {
        return null;
    }

    if (!isPathToCornerClearForExit(startRow, startCol, corner.row, corner.col)) {
        return null;
    }

    const stepsToCorner = Math.abs(startRow - corner.row) + Math.abs(startCol - corner.col);

    return {
        cornerRow: corner.row,
        cornerCol: corner.col,
        exitRow: exit.row,
        exitCol: exit.col,
        stepsToExit: stepsToCorner + 1
    };
}

function isAlignedWithGateLine(startRow, startCol, cornerRow, cornerCol, direction) {
    if (direction.axis === "y") {
        return startCol === cornerCol;
    }

    return startRow === cornerRow;
}

function isPathToCornerClearForExit(fromRow, fromCol, cornerRow, cornerCol) {
    if (fromRow !== cornerRow && fromCol !== cornerCol) return false;
    if (fromRow === cornerRow && fromCol === cornerCol) return true;

    const rowStep = Math.sign(cornerRow - fromRow);
    const colStep = Math.sign(cornerCol - fromCol);
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== cornerRow || currentCol !== cornerCol) {
        if (board[currentRow][currentCol]) return false;
        currentRow += rowStep;
        currentCol += colStep;
    }

    return !board[cornerRow][cornerCol];
}

function getSlideTargetFromDrag(dx, dy, startRow, startCol) {
    const direction = getDirectionFromDrag(dx, dy);
    const maxEmptySteps = getMaxEmptySteps(startRow, startCol, direction.rowStep, direction.colStep);
    if (maxEmptySteps === 0) return null;

    const cellDistance = getCellMoveDistance();
    const dragDistance = direction.axis === "x" ? Math.abs(dx) : Math.abs(dy);
    const requestedSteps = Math.max(1, Math.round(dragDistance / cellDistance));
    const steps = Math.min(requestedSteps, maxEmptySteps);

    return {
        row: startRow + direction.rowStep * steps,
        col: startCol + direction.colStep * steps,
        steps
    };
}

function getMaxEmptySteps(startRow, startCol, rowStep, colStep) {
    let steps = 0;
    let row = startRow + rowStep;
    let col = startCol + colStep;

    while (isInsideBoard(row, col) && !board[row][col]) {
        steps++;
        row += rowStep;
        col += colStep;
    }

    return steps;
}

function getDirectionFromDrag(dx, dy) {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX > absY) {
        return { rowStep: 0, colStep: dx > 0 ? 1 : -1, axis: "x" };
    }

    return { rowStep: dy > 0 ? 1 : -1, colStep: 0, axis: "y" };
}

function getManualExitTarget(row, col, color) {
    if (color === "red" && row === 0 && col === 0) {
        if (redExitSide === "top") return { row: -1, col: 0 };
        if (redExitSide === "left") return { row: 0, col: -1 };
    }

    if ((color === "white" || color === "black") && row === SIZE - 1 && col === SIZE - 1) {
        if (whiteExitSide === "bottom") return { row: SIZE, col: SIZE - 1 };
        if (whiteExitSide === "right") return { row: SIZE - 1, col: SIZE };
    }

    return null;
}

function isInsideBoard(row, col) {
    return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

function animateMove(fromRow, fromCol, toRow, toCol) {
    if (isAnimating) return;
    isAnimating = true;

    const tile = document.querySelector(`.tile[data-row="${fromRow}"][data-col="${fromCol}"]`);
    if (!tile) {
        isAnimating = false;
        return;
    }

    const dx = toCol - fromCol;
    const dy = toRow - fromRow;
    const moveDistance = getCellMoveDistance();

    tile.classList.add("sliding");
    tile.style.transform = `translate(${dx * moveDistance}px, ${dy * moveDistance}px)`;

    setTimeout(function () {
        board[toRow][toCol] = board[fromRow][fromCol];
        board[fromRow][fromCol] = null;
        moves++;
        selected = null;
        isAnimating = false;
        render();
    }, SLIDE_TIME);
}

function animateExit(fromRow, fromCol, exitRow, exitCol) {
    if (isAnimating) return;
    isAnimating = true;

    const tile = document.querySelector(`.tile[data-row="${fromRow}"][data-col="${fromCol}"]`);
    if (!tile) {
        isAnimating = false;
        return;
    }

    const dx = exitCol - fromCol;
    const dy = exitRow - fromRow;
    const moveDistance = getCellMoveDistance();

    tile.classList.add("exiting");
    tile.style.transform = `translate(${dx * moveDistance}px, ${dy * moveDistance}px)`;

    setTimeout(function () {
        board[fromRow][fromCol] = null;
        moves++;
        selected = null;
        isAnimating = false;
        render();
    }, EXIT_TIME);
}

function moveTileVisually(dx, dy, allowOutOfBoard, steps) {
    if (!draggingTile) return;
    const direction = getDirectionFromDrag(dx, dy);
    const maxDistance = getCellMoveDistance() * steps;
    const exitExtra = allowOutOfBoard ? 1.15 : 1;
    const limit = maxDistance * exitExtra;
    let visualX = 0;
    let visualY = 0;

    if (direction.axis === "x") visualX = clamp(dx, -limit, limit);
    else visualY = clamp(dy, -limit, limit);

    draggingTile.style.transform = `translate(${visualX}px, ${visualY}px)`;
}

function highlightDropTarget(targetRow, targetCol) {
    clearDropTargets();
    if (!isInsideBoard(targetRow, targetCol)) return;
    if (board[targetRow][targetCol]) return;
    const targetCell = document.querySelector(`.cell[data-row="${targetRow}"][data-col="${targetCol}"]`);
    if (targetCell) targetCell.classList.add("drop-target");
}

function clearDropTargets() {
    document.querySelectorAll(".drop-target").forEach(function (cell) {
        cell.classList.remove("drop-target");
    });
}

function cancelDrag() {
    resetDraggedTile();
    clearPointerState();
}

function resetDraggedTile() {
    if (draggingTile) {
        draggingTile.style.transform = "";
        draggingTile.classList.remove("dragging");
    }
    clearDropTargets();
}

function clearPointerState() {
    pointerStart = null;
    draggingTile = null;
    dragFrom = null;
    hasDragged = false;
}

function getCellMoveDistance() {
    const firstCell = boardElement.querySelector(".cell");
    if (!firstCell) return 60;
    return firstCell.offsetWidth + getBoardGap();
}

function getBoardGap() {
    const styles = window.getComputedStyle(boardElement);
    const gap = parseFloat(styles.gap);
    return Number.isNaN(gap) ? 6 : gap;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function updateStats(tilesLeft) {
    if (movesElement) movesElement.textContent = moves;
    if (leftElement) leftElement.textContent = tilesLeft;
}

function setMessage(text) {
    if (messageElement) messageElement.textContent = text;
}

if (newGameBtn) newGameBtn.addEventListener("click", createBoard);

createBoard();
