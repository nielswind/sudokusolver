/**
 * Created with JetBrains RubyMine.
 * User: nhwind
 * Date: 15/10/12
 * Time: 09.43
 * To change this template use File | Settings | File Templates.
 */

// Find THE solution of a sudoku square, fast.
// Deterministic

Array.prototype.remove = function(val) {
    var indexOf = this.indexOf(val);
    if (indexOf>=0) {
        this.splice(indexOf,1);
    }
}

function notFilled() {
    return [ 1, 2, 3, 4, 5, 6, 7, 8, 9];
}

function square(row, column) {
    return Math.floor(column / 3)+Math.floor(row/3)*3;
}

var board = [];
var rows = [];
var columns = [];
var squares = [];

// define arrays
for (no = 0; no<9; no++) {
    board[no] = [];
    rows[no] = [];
    columns[no] = [];
    squares[no] = [];
}

for (row = 0; row <9; row++) {
    for (column = 0; column <9; column++) {
        var sq = square(row, column);
        var cell = {
            cell: notFilled(),
            row: row,
            column: column,
            square: sq
        };
        rows[row].push(cell);
        columns[column].push(cell);
        squares[sq].push(cell);
        board[row][column] = cell;
    }
}

//console.log(board);

function removeValueFromCells(value, arrayOfCells) {
    for (i=0; i<9; i++) {
        arrayOfCells[i].cell.remove(value);
        //console.log(i,arrayOfCells[i].cell);
    }
}

function setValue(row,column, value) {
    var r = rows[row];
    var c = columns[column];
    var s = squares[square(row,column)];
    var cell = board[row][column];
    removeValueFromCells(value, r);
    removeValueFromCells(value, c);
    removeValueFromCells(value, s);
    cell.cell = [ value ];
    cell.solved = true;
}

function findForSure() {
    var res = [];
    for (row=0; row<9; row++)  {
        for (column=0; column<9; column++) {
            var cell = board[row][column];
            //console.log(cell.cell.length);
            if (cell.cell.length==1 && !cell.solved) {
                res.push(cell);
            }
        }
    }
    return res;
}

// setup start board
// sq 0
setValue(0,0, 4);
setValue(0,1, 3);
setValue(0,2, 7);
setValue(1,0, 8);
setValue(1,1, 5);

// sq 3
setValue(3,0, 5);
setValue(3,1, 4);
setValue(3,2, 8);
setValue(4,0, 7);
setValue(4,1, 9);
setValue(4,2, 2);
setValue(5,0, 6);
setValue(5,1, 1);
setValue(5,2, 3);

// sq 6
setValue(6,0, 1);
setValue(6,1, 6);
setValue(8,2, 4);

// solve
console.log(findForSure());

//console.log(board);
