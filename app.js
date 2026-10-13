const SIZE = 9;
const MINES = 8;

let gridArray = Array.from({ length: SIZE }, () => Array(SIZE).fill('l'));
let game = 0;      // 0 = playing, 1 = lost, 2 = won
let first = true;

function cellEl(r, c) {
    return document.getElementById(r + "" + c);
}
function inBounds(r, c) {
    return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
}
function isFlagged(el) {
    return el.style.backgroundColor === "orange";
}
function isRevealed(el) {
    return el.style.backgroundColor === "gray";
}

// Place mines at random, never on or next to the first clicked cell,
// then fill every other cell with its neighbour-mine count.
function buildBoard(safeR, safeC) {
    const candidates = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (Math.abs(r - safeR) > 1 || Math.abs(c - safeC) > 1) {
                candidates.push([r, c]);
            }
        }
    }
    // Fisher-Yates shuffle, then take the first MINES cells
    for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    for (let k = 0; k < Math.min(MINES, candidates.length); k++) {
        const [r, c] = candidates[k];
        gridArray[r][c] = 'b';
    }

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (gridArray[r][c] === 'b') continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr, nc = c + dc;
                    if (inBounds(nr, nc) && gridArray[nr][nc] === 'b') count++;
                }
            }
            gridArray[r][c] = String(count);
        }
    }
}

// Reveal a cell; if it is a 0, flood-fill into all 8 neighbours.
function reveal(r, c) {
    if (!inBounds(r, c)) return;
    const el = cellEl(r, c);
    if (isRevealed(el) || isFlagged(el) || gridArray[r][c] === 'b') return;

    el.style.backgroundColor = "gray";
    el.innerHTML = gridArray[r][c];

    if (gridArray[r][c] === '0') {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr !== 0 || dc !== 0) reveal(r + dr, c + dc);
            }
        }
    }
}

function fill(thingID) {
    reveal(Number(thingID[0]), Number(thingID[1]));
}

function showMessage(text) {
    const para = document.createElement("p");
    para.appendChild(document.createTextNode(text));
    document.getElementById("winLose").appendChild(para);
}

function checkWin() {
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (gridArray[r][c] !== 'b' && !isRevealed(cellEl(r, c))) return;
        }
    }
    game = 2;
    showMessage("You won the game!");
}

function leftClicked(thingID) {
    if (game !== 0) return;
    const r = Number(thingID[0]);
    const c = Number(thingID[1]);
    const el = document.getElementById(thingID);

    // Ignore clicks on flagged or already revealed cells
    if (isFlagged(el) || isRevealed(el)) return;

    if (first) {
        first = false;
        buildBoard(r, c);
    }

    if (gridArray[r][c] === 'b') {
        el.style.backgroundColor = "red";
        game = 1;
        showMessage("You lost the game");

        const img = document.createElement("img");
        img.src = "https://media1.tenor.com/m/AibwCNEgGiAAAAAC/dog-puppy.gif";
        document.getElementById("gif").appendChild(img);
    } else {
        reveal(r, c);
        checkWin();
    }
}

function rightClicked(thingID) {
    if (game !== 0) return;
    const el = document.getElementById(thingID);
    if (isRevealed(el)) return;

    if (isFlagged(el)) {
        el.style.backgroundColor = "lightgreen";
    } else {
        el.style.backgroundColor = "orange";
    }
}
