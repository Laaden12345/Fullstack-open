import React, { useState, useEffect } from "react";
import PersonForm from "./PersonFrom/PersonForm";
import Persons from "./Persons/Persons";
import Filter from "./Filter/Filter";
import personService from "./services/personsService";
import personsService from "./services/personsService";
import Notification from "./Notifications/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [nameFilter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const updatePerson = (id, person) => {
    personsService
      .update(id, person)
      .then(returnedPerson => {
        setPersons(
          persons.map(person => (person.id !== id ? person : returnedPerson))
        );
      })
      .then(setNotification(`${person.name}'s number was edited.`))
      .then(
        setInterval(() => {
          setNotification(null);
        }, 5000)
      );
  };
  const addName = event => {
    event.preventDefault();
    if (
      persons.find(
        person => person.name === newName && person.number === newNumber
      )
    ) {
      window.alert(`${newName} is already added to phonebook`);

      setFilter("");
      setFilteredPersons(persons);
    } else if (persons.find(person => person.name === newName)) {
      if (
        window.confirm(
          `This person already exists in the phonebook, replace old number with the new one?`
        )
      ) {
        const personToUpdate = persons.find(person => person.name === newName);
        const changedPerson = { ...personToUpdate, number: newNumber };
        updatePerson(changedPerson.id, changedPerson);
      }
    } else {
      const nameObject = { name: newName, number: newNumber };
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setName("");
          setNumber("");
          setFilter("");
          setFilteredPersons(persons);
        })
        .then(setNotification(`${nameObject.name} was added to phonebook.`))
        .then(
          setInterval(() => {
            setNotification(null);
          }, 5000)
        );
    }
  };
  const removePerson = (event, id) => {
    event.preventDefault();
    const personToDelete = persons.find(person => person.id === id);
    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}`)
    ) {
      personService
        .remove(id)
        .then(
          setNotification(
            `${personToDelete.name} was deleted from the phonebook.`
          )
        )
        .then(
          setInterval(() => {
            setNotification(null);
          }, 5000)
        );
      setPersons(persons.filter(person => person.id !== id));
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
      <Notification message={notification} />
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
      <Persons
        persons={nameFilter ? filteredPersons : persons}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
