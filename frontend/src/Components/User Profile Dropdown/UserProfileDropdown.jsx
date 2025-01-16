import React, { useEffect, useMemo, useState } from "react";
import s from "./UserProfileDropdownStyle.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretUp, faRightFromBracket, faStar } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from "../Dropdown Menu/DropdownMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from '../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const contextIsParent = location.pathname.includes('parent');

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchUserProfilePicture = async () => {
    const profilePictureRef = ref(storage, `profilePictures/${user['id']}.${user['profilePictureType']}`);
    const profilePictureUrl = await getDownloadURL(profilePictureRef);
    setProfilePicture(profilePictureUrl);
  };

  useEffect(() => {
    fetchUserProfilePicture();
  }, [user['id']]);

  let options = [
    {
      "label" : "Προφίλ",
      "icon": faUser,
      "onClick": () => navigate(contextIsParent ? 'family-profile/' : 'profile', {path: '../'})
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
    "onClick": () => {
      localStorage.clear();
      navigate('../', {path: '../..'});
    }
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={s.user_profile}>
      <button className={s.user_profile_button} onClick={toggleMenu}>
        <div className={s.user_circle}>
          <img src={profilePicture}/>
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
