import React from "react";

const Persons = ({ persons }) => {
  const personList = persons.map(person => (
    <tr key={person.name}>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  ));
  return (
    <table>
      <tbody>{personList}</tbody>
    </table>
  );
};

export default Persons;
