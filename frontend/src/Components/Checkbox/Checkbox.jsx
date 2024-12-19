import React from 'react';
import s from './CheckboxStyle.module.css'

const Checkbox = ({ name, label, isChecked, onChange }) => {
  return (
    <label className={s.checkbox_label}>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={onChange}
      />
      {/* <span className={s.checkmark}></span> */}
      {label}
    </label>
  );
};
 
export default Checkbox;