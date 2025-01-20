import React, { useState, useMemo, useEffect } from 'react';
import s from './DatePopUpStyle.module.css';
import trollProf from '../../Assets/Pictures/troll_prof.jpg';
import xIcon from '../../Assets/Icons/X-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faLink, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { times } from '../../utils/options';

const DatePopUp = ({ date, onClose }) => {
  const [isLoading, setIsLoading] = useState(false); // Όταν θα επιβεβαιώνει θα κάνει asyncronous tasks λογικά (θα θέλει λιγο χρονο για ενεργειες στο backend)
  const [isClosing, setIsClosing] = useState(false); // Για το animation
  const userRole = useMemo(() => JSON.parse(localStorage.getItem('user'))['role']);

  const [babysitter, setBabysitter] = useState();
  const [parent, setParent] = useState();

  const fetchData = async () => {
    const babysitterSnap = await getDoc(date.babysitter);
    const parentSnap = await getDoc(date.parent);

    setBabysitter({ ...babysitterSnap.data(), id: date.babysitter.id });
    setParent({ ...parentSnap.data(), id: date.parent.id });
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const navigate = useNavigate();

  const handleClosePopup = () => {
      setIsClosing(true); // Για να ενεργοποιηθεί το animation
      setTimeout(() => {
          setIsLoading(true);
          onClose();
          setIsLoading(false);
      }, 300);
  };

  const handleCancelDate = async () => {
    // api call to cancel date
    const dateDocRef = doc(db, 'Dates', date.id);
    await setDoc(
      dateDocRef,
      {
        ...date,
        status: 'rejected',
        sentBy: userRole,
      }
    );
    handleClosePopup();
  };

  const handleAcceptDate = async () => {
    // api call to accept date
    const dateDocRef = doc(db, 'Dates', date.id);
    await setDoc(
      dateDocRef,
      {
        ...date,
        status: 'accepted',
        sentBy: userRole,
      }
    );
    handleClosePopup();
  };

  const handleEditDate = () => {
    // navigate to edit date page
    navigate(`../edit-date/${date.id}`);
  };

  const handleUserClick = () => {
    if (userRole !== 'parent') return navigate(`/babysitter/parent-details/${parent?.id}`);

    navigate(`/parent/babysitter-details/${babysitter?.id}`);
  };

  return (
    <div
      className={s.popup_overlay}
      onClick={handleClosePopup}
    >
      <div
        className={`${s.popup_content} ${isClosing ? s.closed : s.open}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={xIcon}
          className={s.popup_close_button}
          onClick={handleClosePopup}
        />
        <div className={s.date_info_container}>
          <img
            src={userRole === 'parent' ? babysitter?.profilePicture : parent?.profilePicture }
            className={s.date_info_user_avatar}
            onClick={handleUserClick}
          />
          <div className={s.date_info}>
            <h3 onClick={handleUserClick}>{userRole === 'parent' ? `${babysitter?.name} ${babysitter?.surname}` : `${parent?.name} ${parent?.surname}`}</h3>
            <h3>Στοιχεία Ραντεβού</h3>
            <div className={s.date_details_flex}>
              <p>Μέσο:</p>
              <p className={s.date_place}>{date.place === 'online' ? 'Διαδικτυακά' : 'Δια ζώσης'}</p>
            </div>
            <div className={s.date_details_flex}>
              <p>{date.place === 'online' ? 'Εφαρμογή' : 'Διεύθυνση'}:</p>
              {
                date.place === 'online' ? (
                  <div className={s.date_online_address_container}>
                    <p className={s.date_online_address}>{date.address}</p>
                    <FontAwesomeIcon icon={faLink} className={s.link_icon}/>
                  </div>
                ) : (
                  <p className={s.date_address}>{date.address}</p>
                )
              }
            </div>
            <div>
              <p>Σχόλια:</p>
              <textarea
                disabled
                value={date.fewWords}
              />
            </div>
            <h3>Ημερομηνία: {date.scheduledDate}</h3>
            <h3>Ώρα: {times[date.selectedTimeslot.timeIndex]}</h3>
          </div>
        </div>
        <div className={s.options}>
          <button disabled={isLoading} className={s.cancel_button} onClick={handleCancelDate}>
            <FontAwesomeIcon icon={faBan} className={s.icon} />
            Ακύρωση ραντεβού
          </button>
          <button disabled={isLoading} className={s.edit_button} onClick={handleEditDate}>
            <FontAwesomeIcon icon={faPencil} className={s.icon}/>
            Αλλαγή ραντεβού
          </button>
          {
            date.status === 'pending' && date.sentBy !== userRole && (
              <button disabled={isLoading} className={s.confirm_button} onClick={handleAcceptDate}>
                <FontAwesomeIcon icon={faCheck} className={s.icon}/>
                Αποδοχή ραντεβού
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default DatePopUp;