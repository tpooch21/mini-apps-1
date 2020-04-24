// Import react
// Import react-dom

// Connect four game -
// We want to build a grid, when the app is rendered that represents a table
// 6 X 7 grid
// Build grid using divs, or maybe can use table like in tic tac toe
// When you click on a column, piece should drop to the lowest open space
// Question: How can the board tell what column is being clicked on?


// Keep track of state
// Maybe represent the board as a 6 X 7 matrix, with each spot being either a 0, 1 or 2
// 0 = empty, 1 = red, 2 = black
// Red goes first

// Table component
// Row component

import React from 'react';
import ReactDOM from 'react-dom';
import Table from './table.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Additions to be made
    // Make values objects, with rows as keys, and colors in those rows as objects
    // In space.jsx, we can perform lookups on the columns, and on the rows to determine what color to render
    this.state = {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      playerTurn: 'red',
      gameOver: false
    };

    // Maintain a copy of state
    this.copyOfState = this.state;

    this.onPlayerMove = this.onPlayerMove.bind(this);
    this.checkFourInACol = this.checkFourInACol.bind(this);
  }

  // checkFourInARow()

  checkFourInACol(col) {

    let rows = Object.keys(this.copyOfState[col]);
    // Iterate over rows (which will start at top row of column, since row values decrease as they move physically upward) and check for 4 rows in a row within the column that match the current color
    let inARow = 0;

    for (var i = 0; i < rows.length; i++) {
      if (inARow === 4) {
        return true;
      }
      if (this.copyOfState[col][rows[i]] !== this.state.playerTurn) {
        return false;
      }
      inARow++;
    }
  }

  checkFourInARow(row) {
    let cols = Object.keys(this.copyOfState);

    let inACol = 0;
    for (var i = 0; i < 7; i++) {
      let col = cols[i];
      if (inACol === 4) {
        return true;
      }
      if (this.copyOfState[col][row] !== this.state.playerTurn) {
        inACol = 0;
      } else {
        inACol++;
      }
    }
    return false;
  }

  // Check 4 in a diag
  // Get major diag starting point
  // Pass in row and col as arg
  // Get minor diag start --> calculate diff between current col and col 0
  //  calculate diff between current row and row 0
  //  whichever is smaller, that's the # of spaces we'll move up and left
  // Return row, col of minor diag start
  getMinorDiagStart(row, col) {
    var toTop = row - 0;
    var toLeft = col - 0;

    var rowStart;
    var colStart;

    if (toTop < toLeft) {
      rowStart = row - toTop;
      colStart = col - toTop;
    } else {
      rowStart = row - toLeft;
      colStart = col - toLeft;
    }

    return [rowStart, colStart];
  }

  getMajorDiagStart(row, col) {
    var toTop = row - 0;
    var toRight = 6 - col;

    var rowStart;
    var colStart;

    if (toTop < toLeft) {
      rowStart = row - toTop;
      colStart = col + toTop;
    } else {
      rowStart = row - toRight;
      colStart = col + toRight;
    }

    return [rowStart, colStart];
  }


  checkFourInARowOrCol(row, col) {

    if (this.checkFourInACol(col) || this.checkFourInARow(row)) {
      return true;
    }
    return false;
  }

  onPlayerMove(col) {

    debugger;
    // If object (meaning column) is empty, add piece in the bottom row
    if (Object.keys(this.copyOfState[col]).length === 0) {
      this.copyOfState[col][5] = this.state.playerTurn;
      this.copyOfState[col].mostRecent = 5;
    } else {
      var nextSpace = this.copyOfState[col].mostRecent - 1;
      this.copyOfState[col][nextSpace] = this.state.playerTurn;
      this.copyOfState[col].mostRecent = nextSpace;
    }

    let checkForWinner = this.checkFourInARowOrCol(this.copyOfState[col].mostRecent, col);

    this.setState({
      playerTurn: this.state.playerTurn === 'red' ? 'black' : 'red',
      0: this.copyOfState[0],
      1: this.copyOfState[1],
      2: this.copyOfState[2],
      3: this.copyOfState[3],
      4: this.copyOfState[4],
      5: this.copyOfState[5],
      6: this.copyOfState[6],
      gameOver: checkForWinner
    });

  }


  render() {

    let winner = this.state.playerTurn === 'red' ? 'black' : 'red';

    return (
      <div className="lets-connect">
        <h2>Connect Four</h2>
        <Table state={this.state} event={this.onPlayerMove}/>
        {this.state.gameOver &&
            <h2>{winner} wins!</h2>
        }
      </div>
    );
  }

};

export default App;