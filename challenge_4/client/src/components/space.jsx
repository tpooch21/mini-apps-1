import React from 'react';

var Space = (props) => {
  let col = props.y;
  let row = props.x
  // Check if this space's row is included in the object of filled spaces for this space's column, and render it with the appropriate column
  if (props.state[col][row]) {
    return (
      <div className={`space ${props.state[col][row]}`}></div>
    );
  }

  return (
    <div className="space" onClick={() => {props.onClick(col)}}>
    </div>
  );
};

export default Space;