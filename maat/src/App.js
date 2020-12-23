import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Information({ country }) {
  console.log('haloo');
  
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

function Results({ selectedCountry, setSelectedCountry, countries }) {
  if (!selectedCountry) {
    if (countries.length === 1) {
      setSelectedCountry(countries[0])
      return <Information country={selectedCountry}/>
    }
    else if (countries.length > 10) {
      setSelectedCountry(null)
      return <div>Too many matches, please specify your search</div>;
    } else if (countries.length > 1) {
      return countries.map(country => (
        <div key={country.name} className="countryList">
          <div>{country.name}</div>
          <button onClick={() => setSelectedCountry(country)}>show</button>
        </div>
      ));
    }
  }
  else {
    return <Information country={selectedCountry}/>
    
  }
  return null;
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
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
  console.log('countries', countries);
  

  return (
    <div>
      <div>
        find countries
        <input value={countryFilter} onChange={handleFilterChange} />
      </div>
      <Results selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} countries={countryFilter ? filteredCountries : countries}/>
    </div>
  );
}

export default App;
