import React from 'react';
import Row from './row.jsx';

var Table = (props) => (
  <div className="table">
    <Row click={props.event} state={props.state} num={0}/>
    <Row click={props.event} state={props.state} num={1}/>
    <Row click={props.event} state={props.state} num={2}/>
    <Row click={props.event} state={props.state} num={3}/>
    <Row click={props.event} state={props.state} num={4}/>
    <Row click={props.event} state={props.state} num={5}/>
  </div>
);

export default Table;




