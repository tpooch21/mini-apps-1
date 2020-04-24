import React from 'react';
import Space from './space.jsx';

var Row = (props) => {
  let array = [0, 1, 2, 3, 4, 5, 6];

  return (
  <div className="row" id={`row${props.num}`}>
    {array.map(num => {
      return <Space onClick={props.click} state={props.state} x={props.num} y={num} />
    })}
  </div>
  );
};

export default Row;