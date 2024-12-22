
// Class that defines the related indexes for a cell index [0-80].
// It can tell what the cells row indices, column indices, region indices, 
// adjacent rows indices (that are in the same region), adjacent 
// column indices (that are in the same region).
class Cell {
  constructor(idx) {
    //The index
    this.idx = idx;

    //The indices for the row that contain this cell.
    let rowStart = Math.floor(idx/9);
    let incre = [0,1,2,3,4,5,6,7,8];
    this.rowIdxs = incre.map(x => 9*rowStart+x);

    //The indices for the column that contain this cell.
    let colStart = idx%9;
    this.colIdxs = incre.map(x => colStart+x*9);

    //The indices for the region that contain this cell.
    let regStart = Math.floor(rowStart/3)*27 + Math.floor(colStart/3)*3;
    this.regIdxs = incre.map(x => regStart+Math.floor(x/3)*9 + x%3);

    //The indices for the adjacent rows that are in this region.
    let rowRegStart = 3*Math.floor(rowStart/3);
    let next1Row = 9*(rowRegStart + (rowStart+1)%3);
    let next2Row = 9*(rowRegStart + (rowStart+2)%3);
    this.adjRegRowIdxs = [...incre.map(x => next1Row+x) , ...incre.map(x => next2Row+x)];

    //The indices for the adjacent columns that are in this region.
    let colRegStart = 3*Math.floor(colStart/3);
    let next1Col = colRegStart + (colStart+1)%3;
    let next2Col = colRegStart + (colStart+2)%3;
    this.adjRegColIdxs = [...incre.map(x => next1Col+x*9) , ...incre.map(x => next2Col+x*9)];
  }
}

// Class that generates all the cell values for all 80 cells.
class Indexer {
  constructor() {
    this.lookup = {};
    for (let i=0; i<81; i++) {
       this.lookup[i] = new Cell(i);
    }
  }
}

// Lookup for the row values to numbers [0-8].
let rowLookup = {
  "A":0, "B":1, "C":2, 
  "D":3, "E":4, "F":5, 
  "G":6, "H":7, "I":8,
  "a":0, "b":1, "c":2,
  "d":3, "e":4, "f":5, 
  "g":6, "h":7, "i":8
}

// Lookup for the column values to numbers [0-8].
let colLookup = (col) => {return col-1}

// Maps the cell coordinates to a cell index [0-80].
let cellIdxMap = (row, col) => {
  return 9*rowLookup[row] + colLookup(col)
}

// Returns the substring of the puzzle that represents the rows.
let rowString = (puzzleString, cellIdx) => {
  return indexer.lookup[cellIdx].rowIdxs.map(x=>puzzleString[x]).join();
}

// Returns the substring of the puzzle that represents the columns.
let colString = (puzzleString, cellIdx) => {
  return indexer.lookup[cellIdx].colIdxs.map(x=>puzzleString[x]).join();
}

// Returns the substring of the puzzle that represents the region.
let regionString = (puzzleString, cellIdx) => {
  return indexer.lookup[cellIdx].regIdxs.map(x=>puzzleString[x]).join();
}

// Define the indexer to use in the Sudoku Solver.
let indexer = new Indexer();

// Define the Sudoku solver.
class SudokuSolver {

  // Checks if a puzzle's current inputs do not violate the rules of sudoku.
  validate(puzzle) {
    for (let cellIdx=0; cellIdx<80; cellIdx++) {
      // If the cell has an entry.
      if (puzzle[cellIdx] != ".") {
        // Get the value of the cell.
        let k = puzzle[cellIdx];
        // Create a trail puzzle and remove the current cell value.
        let trailPuzzle = puzzle;
        trailPuzzle[cellIdx] = ".";
        // Make a string of the puzzle.
        let pString = trailPuzzle.join("");
        // Get the row.
        let rString = rowString(pString, cellIdx);
        // Get the column.
        let cString = colString(pString, cellIdx);
        // Get the region.
        let reString = regionString(pString, cellIdx);
        // Create the test regex from the cell value.
        let re = new RegExp(k, "g");
        // If the regex matches the current cell conflicts with the rules of sudoku.
        if (re.test(rString+cString+reString)) {
          return false;
        }
      }
    }
    // All cells passed.
    return true;
  }

  // Checks the coordinate contains a duplicate value.
  checkDuplicateValue(puzzleString, row, column, value) {
    // Map the coordinates to the cell index.
    let cellIdx = cellIdxMap(row,column);
    return puzzleString[cellIdx] == value;
  }
  // Check proposed value does not violate the sudoku row rule.
  checkRowPlacement(puzzleString, row, column, value) {
    // Map the coordinates to the cell index.
    let cellIdx = cellIdxMap(row,column);
    // Get the puzzle substring that represents the cell's row.
    let rString = rowString(puzzleString, cellIdx);
    // Regex to check for the value in the row.
    let re = new RegExp(value, "g");
    return !re.test(rString);
  }
  // Check proposed value does not violate the sudoku column rule.
  checkColPlacement(puzzleString, row, column, value) {
    // Map the coordinates to the cell index.
    let cellIdx = cellIdxMap(row,column);
    // Get the puzzle substring that represents the cell's column.
    let cString = colString(puzzleString, cellIdx);
    // Regex to check for the value in the column.
    let re = new RegExp(value, "g");
    return !re.test(cString);
  }
  // Check proposed value does not violate the sudoku region rule.
  checkRegionPlacement(puzzleString, row, column, value) {
    // Map the coordinates to the cell index.
    let cellIdx = cellIdxMap(row,column);
    // Get the puzzle substring that represents the cell's region.
    let reString = regionString(puzzleString, cellIdx);
    // Regex to check for the value in the region.
    let re = new RegExp(value, "g");
    return !re.test(reString);
  }
  // Finds the values for a cell that do not violate the row, column and region rules of sudoku. Takes the coordinate.
  findAllCellOptions(puzzleString, row, column ) {
    // Map the coordinates to the cell index.
    let cellIdx = cellIdxMap(row,column);
    return this.findAllCellOptionsByCellInd(puzzleString, cellIdx);
  }

  //Finds the values for a cell that do not violate the row, column and region rules of sudoku. Takes the cell index.
  findAllCellOptionsByCellInd(puzzleString, cellIdx) {
    // Get the puzzle substring that represents the cell's row.
    let rString = rowString(puzzleString, cellIdx);
    // Get the puzzle substring that represents the cell's column.
    let cString = colString(puzzleString, cellIdx);
    // Get the puzzle substring that represents the cell's region.
    let reString = regionString(puzzleString, cellIdx);
    // Regex of all the characters not in the rows, columns and regions.
    let re = new RegExp("[^"+rString+cString+reString+"]", "g");
    // Match with all possible values [1-9] and returns an array of the missing entries.
    return ("123456789").match(re);
  }

  // A brute force algorithm.
  solve(puzzle) {
    // Loop over the indices.
    for (let cellIdx=0; cellIdx<81; cellIdx++ ){
      // If the puzzles cell is not set.
      if (puzzle[cellIdx] == ".") {
        // Make the puzzle a string for matching.
        let pString = puzzle.join("");
        // Loop over all the possible cell options.
        for (let k=1; k<10; k++ ){
          // Get the puzzle substring that represents the cell's row.
          let rString = rowString(pString, cellIdx);
          // Get the puzzle substring that represents the cell's column.
          let cString = colString(pString, cellIdx);
          // Get the puzzle substring that represents the cell's region.
          let reString = regionString(pString, cellIdx);
          // Test the guessed value to see if it violates the row, column and region rules of sudoku.
          let re = new RegExp(k, "g");
          if (!re.test(rString+cString+reString)) {
            // Set the puzzle value.
            puzzle[cellIdx] = k;
            // Now solve the new puzzle.
            if(this.solve(puzzle)) {
              // Signals the sub puzzles found the solution.
              return true;
            }
          }
          puzzle[cellIdx] = ".";
        }
        // If all possible guesses for this cell (along with its sub puzzles) did not work, return false.
        return false;
      }
    }
    // Signals the sub puzzles found the solution.
    return true;
  }
}

module.exports = SudokuSolver;