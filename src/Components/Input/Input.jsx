import React from 'react';

import './Input.css';

const Input = ({ placeholderText, register, errors }) => {
  return (
    <span className="input-container">
      <input
        type="text"
        className={errors && 'input-error'}
        placeholder={placeholderText}
        {...register('searchText', { required: true, minLength: 3 })}
      />
      {errors?.type === 'required' && (
        <span className="error-msg">This field is required</span>
      )}
      {errors?.type === 'minLength' && (
        <span className="error-msg">Enter at least 3 chars</span>
      )}
    </span>
  );
};

export default Input;
