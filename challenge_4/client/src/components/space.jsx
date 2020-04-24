import React from 'react';

var Space = (props) => {
  let col = props.y;

  // CHeck if this space should be filled by looking up the highest filled row in this space's column, and checking if this space is in a lower row
  if (props.x >= props.state[col]) {
    return (
      <div className="space filled"></div>
    );
  }

  return (
    <div className="space" onClick={() => {props.onClick(col)}}>
    </div>
  );
};

export default Space;