import React, { useState } from "react";
import PersonForm from "./PersonFrom/PersonForm";
import Persons from "./Persons/Persons";
import Filter from "./Filter/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [nameFilter, setFilter] = useState("");

  const addName = event => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setName("");
      setNumber("");

      setFilter("");
      setFilteredPersons(persons);
    } else {
      const nameObject = { name: newName, number: newNumber };
      setPersons(persons.concat(nameObject));
      setName("");
      setNumber("");

      setFilter("");
      setFilteredPersons(persons);
    }
  };

  const handlePersonChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
    const newFilteredPersons = persons.filter(person =>
      person.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    setFilteredPersons(newFilteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        addName={addName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={nameFilter ? filteredPersons : persons} />
    </div>
  );
};

export default App;
