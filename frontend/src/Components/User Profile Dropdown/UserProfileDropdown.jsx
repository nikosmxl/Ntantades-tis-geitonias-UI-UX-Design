import React, { useState } from "react";
import s from "./UserProfileDropdownStyle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretUp, faRightFromBracket, faStar } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from "../Dropdown Menu/DropdownMenu";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = '1'; //hard coded for now

  const contextIsParent = location.pathname.includes('parent')

  let options = [
    {
      "label" : "Προφίλ",
      "icon": faUser,
      "onClick": () => navigate(contextIsParent ? `family-profile/${userId}` : 'profile', {path: '../'})
    },
  ];

  if (!contextIsParent) {
    options.push({
      "label" : "Οι αξιολογήσεις μου",
      "icon": faStar,
      "onClick": () => navigate('ratings', {path: '../'})
    });
  }

  options.push({
    "label" : "Έξοδος",
    "icon": faRightFromBracket,
    "onClick": () => navigate('../', {path: '../..'})
  });

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
