/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./src/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n    (pos[0] < 3) &&\n    (0 <= pos[1]) &&\n    (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\r\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./src/moveError.js\");\r\n\r\nclass Game {\r\n  constructor() {\r\n    this.board = $(\"square\");\r\n    this.currentPlayer = Board.marks[0];\r\n  }\r\n\r\n  isOver() {\r\n    return this.board.isOver();\r\n  }\r\n\r\n  playMove(e) {\r\n      debugger\r\n    this.board.placeMark(pos, this.currentPlayer);\r\n    this.swapTurn();\r\n  }\r\n\r\n  promptMove(reader, callback) {\r\n    const game = this;\r\n\r\n    this.board.print();\r\n    console.log(`Current Turn: ${this.currentPlayer}`);\r\n\r\n    reader.question('Enter rowIdx: ', rowIdxStr => {\r\n      const rowIdx = parseInt(rowIdxStr);\r\n      reader.question('Enter colIdx: ', colIdxStr => {\r\n        const colIdx = parseInt(colIdxStr);\r\n        callback([rowIdx, colIdx]);\r\n      });\r\n    });\r\n  }\r\n\r\n  run(reader, gameCompletionCallback) {\r\n    this.promptMove(reader, move => {\r\n      try {\r\n        this.playMove(move);\r\n      } catch (e) {\r\n        if (e instanceof MoveError) {\r\n          console.log(e.msg);\r\n        } else {\r\n          throw e;\r\n        }\r\n      }\r\n\r\n      if (this.isOver()) {\r\n        this.board.print();\r\n        if (this.winner()) {\r\n          console.log(`${this.winner()} has won!`);\r\n        } else {\r\n          console.log('NO ONE WINS!');\r\n        }\r\n        gameCompletionCallback();\r\n      } else {\r\n        // continue loop\r\n        this.run(reader, gameCompletionCallback);\r\n      }\r\n    });\r\n  }\r\n\r\n  swapTurn() {\r\n    if (this.currentPlayer === Board.marks[0]) {\r\n      this.currentPlayer = Board.marks[1];\r\n    } else {\r\n      this.currentPlayer = Board.marks[0];\r\n    }\r\n  }\r\n\r\n  winner() {\r\n    return this.board.winner();\r\n  }\r\n}\r\n\r\nmodule.exports = {Game};\r\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/moveError.js":
/*!**************************!*\
  !*** ./src/moveError.js ***!
  \**************************/
/***/ ((module) => {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./src/moveError.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/***/ ((module) => {

eval("class View {\n  constructor(game, $el) {\n    this.game = game;\n    this.$el = $el;\n    this.setupBoard();\n    this.bindEvents();\n  }\n\n  bindEvents() {\n    $(\".square\").on(\"click\", this.game.playMove);\n  }\n\n  makeMove($square) {}\n\n  setupBoard() {\n    for (let i = 0; i < 3; i++){\n      const row = $(\"<ul class='row'></ul>\");\n      for (let x = 0; x < 3; x++){\n        const square = $(\"<li class='square grey'></li>\");\n        square.attr(\"row\", i);\n        square.attr(\"col\", x);\n        row.append(square);\n      }\n      this.$el.append( row );\n    }\n  }\n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/ttt-view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const View = __webpack_require__(/*! ./ttt-view */ \"./src/ttt-view.js\");\nconst {Game} = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n  $(() => {\n    const game = new Game();\n    const container = $(\".ttt\");\n    const view = new View(game, container);\n  });\n\n\n//# sourceURL=webpack:///./src/index.js?");
})();

/******/ })()
;