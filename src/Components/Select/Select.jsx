import React from 'react';

const Select = ({ placeholderText, setSelectedOption, selectedOption }) => {
  return (
    <div>
      <select
        name="criteria"
        id="criteria"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        defaultValue=""
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
