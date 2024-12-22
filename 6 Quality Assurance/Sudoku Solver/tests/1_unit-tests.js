const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const testPuzzles = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

suite('UnitTests', () => {
  suite('checkRowPlacement tests', function () {
    test('true tests', function () {
      assert.isTrue(solver.checkRowPlacement(testPuzzles[0][0], "D", 4, 8), "Upper case row index failed");
      assert.isTrue(solver.checkRowPlacement(testPuzzles[0][0], "f", 9, 4), "Lower case row index failed");
    });
    test('false tests', function () {
      assert.isFalse(solver.checkRowPlacement(testPuzzles[0][0], "D", 2, 1));
    });
  });
  suite('checkColPlacement tests', function () {
    test('true tests', function () {
      assert.isTrue(solver.checkColPlacement(testPuzzles[1][0], "G", 3, 1));
      assert.isTrue(solver.checkColPlacement(testPuzzles[1][0], "E", 6, 2));
    });
    test('false tests', function () {
      assert.isFalse(solver.checkColPlacement(testPuzzles[1][0], "b", 4, 7));
      assert.isFalse(solver.checkColPlacement(testPuzzles[1][0], "C", 6, 1));
    });
  });
  suite('checkRegionPlacement tests', function () {
    test('true tests', function () {
      assert.isTrue(solver.checkRegionPlacement(testPuzzles[2][0], "C", 6, 2));
      assert.isTrue(solver.checkRegionPlacement(testPuzzles[2][0], "i", 8, 9));
    });
    test('false tests', function () {
      assert.isFalse(solver.checkRegionPlacement(testPuzzles[2][0], "c", 9, 6));
      assert.isFalse(solver.checkRegionPlacement(testPuzzles[2][0], "g", 6, 3));
    });
  });
  suite('findAllCellOptions tests', function () {
    test("Finds inputs that don't violate sudoku rules", function () {
      assert.deepEqual(solver.findAllCellOptions(testPuzzles[3][0], "A", 1), ['3','4'])
    })
  });
  suite('checkDuplicateValue tests', function () {
    test('true tests', function () {
      assert.isTrue(solver.checkDuplicateValue(testPuzzles[3][0], "g", 6, 2))
    })
    test('false tests', function () {
      assert.isFalse(solver.checkDuplicateValue(testPuzzles[3][0], "g", 6, 4))
      assert.isFalse(solver.checkDuplicateValue(testPuzzles[3][0], "f", 6, 4))
    })
  });
  suite('valadate tests', function () {
    test('passing test', function () {
      assert.isTrue(solver.validate([...testPuzzles[3][0]]))
    })
    test('failing test', function () {
      assert.isFalse(solver.validate([...testPuzzles[5][0]]))
    })
  });

  suite('solve tests', function () {
    test('solution 0 tests', function () {
      let test = [...testPuzzles[0][0]]
      assert.isTrue(solver.solve(test))
      assert.equal(test.join(""), testPuzzles[0][1])
    })

    test('solution 1 tests', function () {
      let test = [...testPuzzles[1][0]]
      assert.isTrue(solver.solve(test))
      assert.equal(test.join(""), testPuzzles[1][1])
    })

    test('solution 2 tests', function () {
      let test = [...testPuzzles[2][0]]
      assert.isTrue(solver.solve(test))
      assert.equal(test.join(""), testPuzzles[2][1])
    })

    test('solution 3 tests', function () {
      let test = [...testPuzzles[3][0]]
      assert.isTrue(solver.solve(test))
      assert.equal(test.join(""), testPuzzles[3][1])
    })

    test('solution 4 tests', function () {
      let test = [...testPuzzles[4][0]]
      assert.isTrue(solver.solve(test))
      assert.equal(test.join(""), testPuzzles[4][1])
    })

    test('no solution tests', function () {
      let test = [...testPuzzles[5][0]]
      assert.isFalse(solver.solve(test))
    })
  });
});