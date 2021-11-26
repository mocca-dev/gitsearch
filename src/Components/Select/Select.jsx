import React from 'react';

import './Select.css';

const Select = ({ placeholderText, setSelectedOption, selectedOption }) => {
  return (
    <div className="select-container">
      <select
        name="criteria"
        id="criteria"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        defaultValue="Name"
      >
        <option value="" disabled hidden>
          {placeholderText}
        </option>
        <option value="Name">{placeholderText} Name</option>
        <option value="Login">{placeholderText} Login</option>
        <option value="Email">{placeholderText} Email</option>
      </select>
    </div>
  );
};

export default Select;
