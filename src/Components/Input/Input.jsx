import React from 'react';

const Input = ({ placeholderText, setSearchText, searchText }) => {
  return (
    <>
      <input
        type="text"
        placeholder={placeholderText}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </>
  );
};

export default Input;
