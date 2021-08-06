"use strict";

// constants
const chessBoardSize = 8;

const white = "white";
const black = "black";

const pawn = "fas fa-chess-pawn";
const rook = "fas fa-chess-rook";
const knight = "fas fa-chess-knight";
const bishop = "fas fa-chess-bishop";
const king = "fas fa-chess-king";
const queen = "fas fa-chess-queen";

const literals = ["a", "b", "c", "d", "e", "f", "g", "h"];

let chessBoard = {
    cells: [],
    size: chessBoardSize
}

/**
 * Build chess board without figures
 * first cell (left top)
 * 
 * cell = {
 *     color: white,
 *     figure: null,
 *     num: 1,
 *     lit: "a"
 * }
 */
function buildChessBoardWithoutFigures() {
    let cellColor = white;
    for (let i = 1; i <= chessBoard.size; i++) {
        let row = [];
        for (let j = 0; j < chessBoard.size; j++) {
            row.push({ color: cellColor, num: i, lit: literals[j] })
            cellColor = invertColor(cellColor);
        }
        chessBoard.cells.push(row);
        cellColor = invertColor(cellColor);
    }
}

/**
 * figure = {
 *     color: white,
 *     name: pawn,
 *     onBoard: true
 * }
 */
function addFigures() {
    addPawns();
    addRooks();
    addKnights();
    addBishops();
    addKings();
    addQueens();
}

function addFigure(figureName, lit, num, color) {
    let cell = chessBoard.cells[num][literals.indexOf(lit)];
    cell.figure = { color: color, name: figureName, onBoard: true };
}

function addRooks() {
    addFigure(rook, "a", 1 - 1, white);
    addFigure(rook, "h", 1 - 1, white);
    addFigure(rook, "a", 8 - 1, black);
    addFigure(rook, "h", 8 - 1, black);
}

function addKnights() {
    addFigure(knight, "b", 1 - 1, white);
    addFigure(knight, "g", 1 - 1, white);
    addFigure(knight, "b", 8 - 1, black);
    addFigure(knight, "g", 8 - 1, black);
}

function addBishops() {
    addFigure(bishop, "c", 1 - 1, white);
    addFigure(bishop, "f", 1 - 1, white);
    addFigure(bishop, "c", 8 - 1, black);
    addFigure(bishop, "f", 8 - 1, black);
}

function addKings() {
    addFigure(king, "e", 1 - 1, white);
    addFigure(king, "e", 8 - 1, black);
}

function addQueens() {
    addFigure(queen, "d", 1 - 1, white);
    addFigure(queen, "d", 8 - 1, black);
}

function addPawns() {
    for (const lit of literals) {
        addFigure(pawn, lit, 2 - 1, white);
        addFigure(pawn, lit, 7 - 1, white);
    }
}

/**
 * black -> white, white -> black
 * @param {string} cellColor 
 * @returns another color
 */
function invertColor(cellColor) {
    return cellColor === white ? black : white;
}


buildChessBoardWithoutFigures();
addFigures();