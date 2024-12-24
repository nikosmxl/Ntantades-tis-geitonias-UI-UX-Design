import React, { useState } from 'react';
import s from './DropdownStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ selectedOption, placeholder, options, onChange, isEnabled=true }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const noneSelected = selectedOption === null || (typeof(selectedOption) === 'string' && selectedOption.trim() === '');

  const handleSelection = (option) => {
    if (isEnabled) {
      setMenuOpen(false);
      onChange(option);
    }
  };

  return (
    <div className={s.dropdown_container}>
      <div className={s.dropdown_header}>
        <p className={`${s.dropdown_content} ${noneSelected ? s.placeholder : ''}`}>{noneSelected ? placeholder : selectedOption}</p>
        <div
          className={s.dropdown_menu_toggle}
          onClick={() => setMenuOpen((curr) => !curr)}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
      {
        isMenuOpen && (
          <div className={s.dropdown_menu}>
            {
              options.map((option) => {
                return (
                  <div
                    key={option}
                    className={s.dropdown_menu_option}
                    onClick={() => handleSelection(option)}
                  >
                    {option}
                  </div>
                );
              })
            }
          </div>
        )
      }
    </div>
  );
};
 
export default Dropdown;