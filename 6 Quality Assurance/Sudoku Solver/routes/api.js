'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  // Get the sudoku solver.
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      // Inputs.
      let puzzle = req.body.puzzle;
      let coord = req.body.coordinate;
      let val = req.body.value;

      // Check input fields exist.
      if (puzzle==undefined | coord==undefined | val==undefined ) return res.json({ "error": "Required field(s) missing" });

      // Test the inputs are valid.
      let reCoord = /^([A-Ia-i])([1-9])$/;
      let reVal = /^[1-9]$/;
      let rePuz = /[^1-9\.]/;
      if (!reCoord.test(coord)) return res.json({ "error": "Invalid coordinate" });
      if (!reVal.test(val)) return res.json({ "error": "Invalid value" });
      if (puzzle.length != 81) return res.json({ "error": "Expected puzzle to be 81 characters long" });
      if (rePuz.test(puzzle)) return res.json({ "error": "Invalid characters in puzzle" });
      
      // Get the coordinate representation of the row and column.
      let [_, row, col] = coord.match(reCoord);
      
      // Test the value is already in that coordinate of the puzzle.
      if (solver.checkDuplicateValue(puzzle,row ,col, val)) return res.json({ "valid": true });

      // Determine if the value violates the row, column, and region sudoku rules.
      let validRow = solver.checkRowPlacement(puzzle,row ,col, val);
      let validCol = solver.checkColPlacement(puzzle, row, col, val);
      let validReg = solver.checkRegionPlacement(puzzle, row ,col, val);
      if (validRow & validCol & validReg) return res.json({ "valid": true });

      // Determine the conflicts (if they exist).
      let conflict = [];
      if (!validRow) conflict.push("row");
      if (!validCol) conflict.push("column");
      if (!validReg) conflict.push("region");

      return res.json({ "valid": false, conflict });
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      // Inputs.
      let puzzle = req.body.puzzle;

      // Error if no puzzle is defined.
      if (puzzle == undefined) return res.json({error: 'Required field missing'});
      
      // Error if the puzzle has too many characters.
      if (puzzle.length != 81) return res.json({ "error": "Expected puzzle to be 81 characters long" });

      // Error if the puzzle contains invalid characters.
      let rePuz = /[^1-9\.]/;
      if (rePuz.test(puzzle)) return res.json({ "error": "Invalid characters in puzzle" });

      // Try to solve the puzzle.
      let puzzleArr = [...puzzle];
      // Error if it does not solve.
      if (!solver.solve(puzzleArr)) return res.json({ "error": "Puzzle cannot be solved" });
      // Return the solution.
      return res.json({ "solution":  puzzleArr.join("")});
    });
};