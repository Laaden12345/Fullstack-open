import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = props => {
  const [selected, setSelected] = useState(
    parseInt(Math.random() * props.anecdotes.length)
  );

  const [points, setPoints] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const updatePoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const setToSelected = newValue => {
    setSelected(newValue);
  };

  const getMostVotesIndex = () => {
    return points.indexOf(Math.max(...points));
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes.</div>
      <Button handleClick={() => updatePoints()} text="vote" />
      <Button
        handleClick={() =>
          setToSelected(parseInt(Math.random() * props.anecdotes.length))
        }
        text="next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[getMostVotesIndex()]}</div>
      <div>has {points[getMostVotesIndex()]} votes</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
