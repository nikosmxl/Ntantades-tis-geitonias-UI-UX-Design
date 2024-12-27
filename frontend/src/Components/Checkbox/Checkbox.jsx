import React from 'react';
import s from './CheckboxStyle.module.css'

const Checkbox = ({ name, isChecked, onChange, label=null, isEnabled=true, width='18px', height='18px' }) => {
  return (
    <label className={s.checkbox_label}>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={onChange}
        disabled={!isEnabled}
        style={{
          width: width,
          height: height,
        }}
      />
      {label ? label : ''}
    </label>
  );
};
 
export default Checkbox;