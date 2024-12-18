import React from "react";
import s from "./DropdownMenuStyle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function DropdownMenu({ isOpen }) {

  return (
    <div className={`${s.dropdown_menu} ${isOpen ? s.open : ""}`}>
        <div className={s.dropdown_triangle}>
            <div className={s.inner_dropdown_triangle}></div>
        </div>
        <div className={s.options_menu}>
            <div className={`${s.menu_item} ${s.first}`}>
              <FontAwesomeIcon icon={faUser} className={s.options_icon} />
              <p>Προφίλ</p>
            </div>
            <div className={`${s.menu_item} ${s.last}`}>
              <FontAwesomeIcon icon={faRightFromBracket} className={s.options_icon} />
              <p>Έξοδος</p>
            </div>
        </div>
    </div>
  );
}

export default DropdownMenu;
