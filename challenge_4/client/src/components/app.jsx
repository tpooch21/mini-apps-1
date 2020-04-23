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
      playerTurn: 'red'
    };
  }

  render() {
    return (
      <div className="lets-connect">
        <h2>Connect Four</h2>
        <Table state={this.state}/>
      </div>
    );
  }

};