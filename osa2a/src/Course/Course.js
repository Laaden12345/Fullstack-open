import React from "react";

const Header = props => {
  return <h1>{props.course["name"]}</h1>;
};
const Content = props => {
  return props.parts.map(part => <Part key={part.name} part={part} />);
};
const Part = props => {
  return (
    <p>
      {props.part["name"]} {props.part["exercises"]}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <div>Yhteensä {total} tehtävää.</div>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
