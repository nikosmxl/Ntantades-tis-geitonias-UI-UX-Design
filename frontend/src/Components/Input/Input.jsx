import React from 'react';
import s from './InputStyle.module.css';

const Input = ({ name, value, placeholder, onChange }) => {
  
  const noneSelected = value === null || (typeof(value) === 'string' && value.trim() === '');


  const handleInputChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <div className={s.input_container}>
      <input
        name={name}
        type="text"
        value={noneSelected ? '' : value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};
 
export default Input;