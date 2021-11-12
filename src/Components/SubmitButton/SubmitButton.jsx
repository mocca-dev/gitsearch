import React from 'react';

import SearchIcon from './SearchIcon/SearchIcon';
import './SubmitButton.css';

const SubmitButton = () => {
  return (
    <>
      <button className="submit-button" type="submit">
        <SearchIcon />
      </button>
    </>
  );
};

export default SubmitButton;
