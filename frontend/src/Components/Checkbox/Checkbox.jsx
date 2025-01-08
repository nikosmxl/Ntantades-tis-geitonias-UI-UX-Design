import React from 'react';
import s from './CheckboxStyle.module.css'

const Checkbox = ({ name, isChecked, onChange, label=null, isEnabled=true, width='18px', height='18px', isRed=false }) => {
  return (
    <label className={s.checkbox_label}
      style={{
        cursor: isEnabled ? 'pointer' : 'default',
      }}
    >
      <input
        type="checkbox"
        name={name}
        className={isRed ? s.red_input : s.normal_input}
        checked={isChecked}
        onChange={onChange}
        disabled={!isEnabled}
        style={{
          width: width,
          height: height,
          cursor: isEnabled ? 'pointer' : 'default',
        }}
      />
      {label ? label : ''}
    </label>
  );
};
 
export default Checkbox;