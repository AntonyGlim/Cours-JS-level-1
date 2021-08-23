"use strict";

// constants
const container = document.querySelector("div.container");
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
    console.log(chessBoard);
}

/**
 * figure = {
 *     color: white,
 *     name: pawn,
 *     onBoard: true,
 *     active: false
 * }
 */
function addFigures() {
    addPawns();
    addRooks();
    addKnights();
    addBishops();
    addKings();
    addQueens();
    console.log(chessBoard);
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
        addFigure(pawn, lit, 7 - 1, black);
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

/**
 * Paint chessboard on page
 */
function showChessBoardOnPage() {
    let chessBoardTable = removeChessBoardTableFromPageIfPresentAndCreateNewAndReturn();
    insertHorizontalBorder(chessBoardTable);
    for (let i = 0; i <= chessBoard.size - 1; i++) {
        let tableRow = chessBoardTable.insertRow();
        buildChessBoardRow(chessBoard.cells[i], tableRow, i + 1);
    }
    insertHorizontalBorder(chessBoardTable);
}

/*         _____________________
 * Insert: | |A|B|C|D|I|F|G|H| | row
 * @param {Element} chessBoardTable - table element
 */
function insertHorizontalBorder(chessBoardTable) {
    let tableRow = chessBoardTable.insertRow();
    buildBoarderCell(" ", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("A", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("B", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("C", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("D", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("I", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("F", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("G", "border-horizontal", tableRow.insertCell());
    buildBoarderCell("H", "border-horizontal", tableRow.insertCell());
    buildBoarderCell(" ", "border-horizontal", tableRow.insertCell());
}

/**
 * Remove table from page if present
 * and create new table? and add it to page
 * 
 * @returns <table class="chess-board-table"></table> tag on page and fill it
 */
function removeChessBoardTableFromPageIfPresentAndCreateNewAndReturn() {
    let chessBoardTable = document.querySelector("table.chess-board-table");
    //if (chessBoardTable) chessBoardTable.remove();
    chessBoardTable = document.createElement("table");
    chessBoardTable.classList.add("chess-board-table");
    container.appendChild(chessBoardTable);
    return chessBoardTable;
}

/**
 *  Build board row
 * @param {*} cellsRow - object from json
 * @param {*} tableRow - element (node)
 */
function buildChessBoardRow(cellsRow, tableRow, tableRowNumber) {
    buildBoarderCell(tableRowNumber, "border-vertical", tableRow.insertCell());
    for (let i = 0; i < cellsRow.length; i++) {
        let tableCell = tableRow.insertCell();
        buildChessBoardCell(cellsRow[i], tableCell);
    }
    buildBoarderCell(tableRowNumber, "border-vertical", tableRow.insertCell());
}

/**
 * Build board cell
 * 
 * @param {*} cell - object from json
 * @param {*} tableCell - element (node)
 */
function buildChessBoardCell(cell, tableCell) {
    tableCell.classList.add(`brown-${cell.color}`);
    tableCell.setAttribute("lit", cell.lit);
    tableCell.setAttribute("num", cell.num);
    tableCell.addEventListener("click", onTableCellClick);
    if (cell.figure) {
        tableCell.innerHTML = `<i class="${cell.figure.name} chess-figure ${cell.figure.color}"></i>`;
    }
}

/**
 * Build border cell
 * @param {*} title - like A, B, ... H or 1, 2, ... 8
 * @param {*} clazz - "border-horizontal" or "border-vertical"
 * @param {*} tableCell - cell of table
 */
function buildBoarderCell(title, clazz, tableCell) {
    tableCell.classList.add(clazz);
    tableCell.innerHTML = title;
}

/**
 * 
 * @param {MouseEvent} event 
 */
function onTableCellClick(event) {
    let cell = event.target;
    if (cell.tagName.toUpperCase() === "I") cell = event.target.parentElement;
    console.log(cell);
    let coordinates = detectCoordinatesFromTag(cell);
    console.log(`lit: ${coordinates.lit}, num: ${coordinates.num}`);
}

/**
 * Go thrue chessBoard and check all figures active status
 * @returns cell if it is active
 */
function getActiveFigureCoordinates() {
    for (let i = 0; i < chessBoard.size; i++) {
        let row = chessBoard.cells[i];
        for (let j = 0; j < row.length; j++) {
            let figure = row[j].figure;
            if (figure != null && figure.active == true) {
                console.log(row[j]);
                return row[j];
            }
        }
    }
    return null;
}

/**
 * Detect coordinates from tag
 * @param {Element} cellAsTdElement - for example: <td class="brown-black" lit="a" num="4"></td>
 * @returns coordinates like {lit: "a", num: "4"}
 */
function detectCoordinatesFromTag(cellAsTdElement) {
    return { lit: cellAsTdElement.getAttribute("lit"), num: cellAsTdElement.getAttribute("num") }
}


buildChessBoardWithoutFigures();
addFigures();

showChessBoardOnPage();