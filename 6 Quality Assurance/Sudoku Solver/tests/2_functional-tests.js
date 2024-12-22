const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const testPuzzles = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

chai.use(chaiHttp);

/*
  1.  Solve a puzzle with valid puzzle string: POST request to /api/solve
  2.  Solve a puzzle with missing puzzle string: POST request to /api/solve
  3.  Solve a puzzle with invalid characters: POST request to /api/solve
  4.  Solve a puzzle with incorrect length: POST request to /api/solve
  5.  Solve a puzzle that cannot be solved: POST request to /api/solve
  6.  Check a puzzle placement with all fields: POST request to /api/check
  7.  Check a puzzle placement with single placement conflict: POST request to /api/check
  8.  Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  9.  Check a puzzle placement with all placement conflicts: POST request to /api/check
  10. Check a puzzle placement with missing required fields: POST request to /api/check
  11. Check a puzzle placement with invalid characters: POST request to /api/check
  12. Check a puzzle placement with incorrect length: POST request to /api/check
  13. Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  14. Check a puzzle placement with invalid placement value: POST request to /api/check
*/

suite('Functional Tests', () => {
  suite('Solve Tests', () => {
    suite('Test solve POSTS /api/solve', () => {
      // 1
      test('1. POST a valid puzzle', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({
            puzzle: testPuzzles[0][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.solution, testPuzzles[0][1])
            done()
          })
      })
      // 2
      test('2. POST with missing input data', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field missing')
            done()
          })
      })
      // 3
      test('3. POST puzzle with invalid char', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({
            puzzle: testPuzzles[6][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Invalid characters in puzzle')
            done()
          })
      })
      // 4
      test('4. POST puzzle with missing input data', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({
            puzzle: testPuzzles[7][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
            done()
          })
      })
      // 5
      test('5. POST puzzle with insolvable puzzle', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({
            puzzle: testPuzzles[5][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Puzzle cannot be solved')
            done()
          })
      })
    })
  })

  suite('Check Tests', () => {
    suite('Test check POSTS /api/check', () => {
      // 6
      test('6. POST with valid inputs', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "E6",
            value: 2,
            puzzle: testPuzzles[1][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isTrue(res.body.valid)
            done()
          })
      })
      // 7
      test('7. POST with valid inputs with a single sudoku conflict', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "B6",
            value: 2,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid)
            assert.deepEqual(res.body.conflict, ["column"])
            done()
          })
      })
      // 8
      test('8. POST with valid inputs with multiple sudoku conflicts', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "B6",
            value: 9,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid)
            assert.deepEqual(res.body.conflict, [ "row", "region" ])
            done()
          })
      })
      // 9
      test('9. POST with valid inputs with all sudoku conflicts', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: 7,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid)
            assert.deepEqual(res.body.conflict, [  "row", "column", "region" ])
            done()
          })
      })
      // 10
      test('10. POST with missing required fields', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            value: 7,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Required field(s) missing")
            done()
          })
      })
      // 11
      test('11. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
      // 12
      test('12. POST with a puzzle with with incorrect length', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "1",
            puzzle: testPuzzles[7][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
            done()
          })
      })
      // 13
      test('13. POST with a puzzle with with incorrect length', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "1",
            puzzle: testPuzzles[7][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long")
            done()
          })
      })
      // 14
      test('14. POST with invalid placement value', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "d5",
            value: "aad",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
    })
  })
});