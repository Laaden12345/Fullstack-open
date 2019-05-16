import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good || neutral || bad ? good + neutral + bad : 0;
  const average = (good - bad) / total;
  const positives = (good / total) * 100;

  if (total > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="hyvä" value={good} />
          <Statistic text="neutraalli" value={neutral} />
          <Statistic text="huono" value={bad} />
          <Statistic text="yhteensä" value={total} />
          <Statistic text="keskiarvo" value={average} />
          <Statistic text="positiivisia" value={positives} />
        </tbody>
      </table>
    );
  } else {
    return <div>Ei yhtään palautetta annettu</div>;
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)} text="hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutraali" />
      <Button handleClick={() => setBad(bad + 1)} text="huono" />
      <h1>Statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
