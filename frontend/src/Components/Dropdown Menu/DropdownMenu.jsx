import React from "react";
import s from "./DropdownMenuStyle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DropdownMenu({ isOpen, options}) {
  
  return (
    <div className={`${s.dropdown_menu} ${isOpen ? s.open : ""}`}>
        <div className={s.dropdown_triangle}>
            <div className={s.inner_dropdown_triangle}></div>
        </div>
        <div className={s.options_menu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${s.menu_item} ${
                index === 0 ? s.first : index === options.length - 1 ? s.last : ""
              }`}
              onClick={option.onClick}
            >
              {option?.icon && 
                <FontAwesomeIcon icon={option.icon} className={s.options_icon} />
              }
              <p className={s.label}>{option.label}</p>
            </div>
          ))}
        </div>
    </div>
  );
}

export default DropdownMenu;
