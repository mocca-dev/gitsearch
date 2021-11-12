import React from 'react';

import './Select.css';

const Select = ({ placeholderText, setSelectedOption, selectedOption }) => {
  return (
    <div className="select-container">
      <label htmlFor="criteria">Search by</label>
      <select
        name="criteria"
        id="criteria"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        defaultValue="name"
      >
        <option value="" disabled hidden>
          {placeholderText}
        </option>
        <option value="name">Name</option>
        <option value="login">Login</option>
        <option value="email">Email</option>
      </select>
    </div>
  );
};

export default Select;
