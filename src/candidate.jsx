import React from 'react';
import ReactDOM from 'react-dom';

const Candidate = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.votes}</p>
      <button id={props.name} onClick={props.addVote}>Add Vote!</button>
    </div>
  )

}

export default Candidate;