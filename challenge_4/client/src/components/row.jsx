import React from 'react';

var Row = (props) => {
  let array = [0, 1, 2, 3, 4, 5, 6];

  return (
  <div className={`row${props.num}`}>
    {array.forEach(num => {
      return <Square x={props.num} y={num} />
    })}
  </div>
  );
};