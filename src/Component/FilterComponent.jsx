import React, { useEffect, useState } from 'react';
import "../Component/Style/FilterComponent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function FilterComponent({ usersData, onFilterChange, onSortToggle }) {
  const [selectedData, setSelectedData] = useState({
    state: "",
    gender: "",
    country: ""
  });

  const [filterStates, setFilterStates] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    const statesSet = new Set();
    const countriesSet = new Set();

    usersData.forEach(user => {
      if (user.address) {
        if (user.address.state) statesSet.add(user.address.state);
        if (user.address.country) countriesSet.add(user.address.country);
      }
    });

    setFilterStates(Array.from(statesSet));
    setFilterCountries(Array.from(countriesSet));
  }, [usersData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newState = { ...selectedData, [name]: value };
    setSelectedData(newState);
    onFilterChange(newState);
  };

  const handleIconClick = () => {
    onSortToggle('id');
  };

  return (
    <div className='filterContainer'>
      <div>
        <h1>Employees</h1>
      </div>
      <div className='innerContainer'>
        <FontAwesomeIcon icon={faFilter} color='red' onClick={handleIconClick} />
        <select name="state" value={selectedData.state} onChange={handleOnChange}>
          <option value="">State</option>
          {filterStates.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
        <select name="country" value={selectedData.country} onChange={handleOnChange}>
          <option value="">Country</option>
          {filterCountries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
        <select name="gender" value={selectedData.gender} onChange={handleOnChange}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}
