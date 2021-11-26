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
        defaultValue="name"
      >
        <option value="" disabled hidden>
          {placeholderText}
        </option>
        <option value="name">{placeholderText} Name</option>
        <option value="login">{placeholderText} Login</option>
        <option value="email">{placeholderText} Email</option>
      </select>
    </div>
  );
};

export default Select;
