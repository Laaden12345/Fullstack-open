import React, { useState, useEffect } from "react";
import axios from "axios";

function Information({ country }) {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lan => (
          <li key={lan.name}>{lan.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" width="200px" />
    </div>
  );
}

function Results({ countries }) {
  if (countries.length > 10) {
    return <div>Too many matches, please specify your search</div>;
  } else if (countries.length > 1) {
    return countries.map(country => (
      <div key={country.name}>{country.name}</div>
    ));
  } else if (countries.length === 1) {
    const country = countries[0];
    return <Information country={country} />;
  }
  return null;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [countryFilter, setCountryFilter] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setCountryFilter(event.target.value);

    const newFilteredCountries = countries.filter(country =>
      country.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    setFilteredCountries(newFilteredCountries);
  };

  return (
    <div>
      <div>
        find countries
        <input value={countryFilter} onChange={handleFilterChange} />
      </div>
      <Results countries={countryFilter ? filteredCountries : countries} />
    </div>
  );
}

export default App;
