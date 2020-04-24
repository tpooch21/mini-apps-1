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
    this.state = {
      playerTurn: 'red',
      0: 6,
      1: 6,
      2: 6,
      3: 6,
      4: 6,
      5: 6,
      6: 6
    };

    // Maintain a copy of state
    this.copyOfState = this.state;

    this.onPlayerMove = this.onPlayerMove.bind(this);
  }


  // Click handler, takes in a y value as an input
  // Looks at state, which holds y values and their corresponding lowest open rows
  // For example state = { cols: {0: 1}} --> says column 0 has a piece in row 0, which means next open spot is row 1
  onPlayerMove(col) {

    this.copyOfState[col]--;


    this.setState({
      playerTurn: this.state.playerTurn === 'red' ? 'black' : 'red',
      0: this.copyOfState[0],
      1: this.copyOfState[1],
      2: this.copyOfState[2],
      3: this.copyOfState[3],
      4: this.copyOfState[4],
      5: this.copyOfState[5],
      6: this.copyOfState[6]
    });

  }


  render() {
    return (
      <div className="lets-connect">
        <h2>Connect Four</h2>
        <Table state={this.state} event={this.onPlayerMove}/>
      </div>
    );
  }

};

export default App;