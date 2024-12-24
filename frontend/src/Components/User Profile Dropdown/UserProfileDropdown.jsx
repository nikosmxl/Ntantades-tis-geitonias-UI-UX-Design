import React, { useState } from "react";
import s from "./UserProfileDropdownStyle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from "../Dropdown Menu/DropdownMenu";

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dummyfunc = () => {
    return;
  }

  const options = [
    {
      "label" : "Προφίλ",
      "icon": faUser,
      "onClick": dummyfunc
    },
    {
      "label" : "Έξοδος",
      "icon": faRightFromBracket,
      "onClick": dummyfunc
    }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.user_profile}>
      <button className={s.user_profile_button} onClick={toggleMenu}>
        <div className={s.user_circle}>
          <FontAwesomeIcon icon={faUser} className={s.user_icon} />
        </div>
        {isOpen ?
          <FontAwesomeIcon icon={faCaretUp} className={s.dropdown_arrow} />
          :
          <FontAwesomeIcon icon={faCaretDown} className={s.dropdown_arrow} />
        }
      </button>
      <DropdownMenu isOpen={isOpen} options={options}/>
    </div>
  );
}

export default UserProfileDropdown;
