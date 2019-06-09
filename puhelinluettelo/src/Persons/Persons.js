import React from "react";

const Persons = ({ persons, removePerson }) => {
  const personList = persons.map(person => (
    <tr key={person.name}>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={e => removePerson(e, person.id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <table>
      <tbody>{personList}</tbody>
    </table>
  );
};

export default Persons;
