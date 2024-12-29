import React, { useState } from 'react';
import s from './DatePopUpStyle.module.css';
import trollProf from '../../Assets/Pictures/troll_prof.jpg';
import xIcon from '../../Assets/Icons/X-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck, faLink, faPencil } from '@fortawesome/free-solid-svg-icons';

const DatePopUp = ({ date, onClose }) => {
  const [isLoading, setIsLoading] = useState(false); // Όταν θα επιβεβαιώνει θα κάνει asyncronous tasks λογικά (θα θέλει λιγο χρονο για ενεργειες στο backend)
  const [isClosing, setIsClosing] = useState(false); // Για το animation

  const handleClosePopup = () => {
      setIsClosing(true); // Για να ενεργοποιηθεί το animation
      setTimeout(() => {
          setIsLoading(true);
          onClose();
          setIsLoading(false);
      }, 300);
  };

  const handleCancelDate = () => {
    // api call to cancel date
    handleClosePopup();
  };

  const handleAcceptDate = () => {
    // api call to accept date
    handleClosePopup();
  };

  const handleEditDate = () => {
    // navigate to edit date page
    handleClosePopup();
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
            src={trollProf}
            className={s.date_info_user_avatar}
          />
          <div className={s.date_info}>
            <h3>Ονοματεπώνυμο</h3>
            <h3>Στοιχεία Ραντεβού</h3>
            <div className={s.date_details_flex}>
              <p>Μέσο:</p>
              <p className={s.date_place}>{date.place === 'online' ? 'Διαδικτυακά' : 'Δια ζώσης'}</p>
            </div>
            <div className={s.date_details_flex}>
              <p>Εφαρμογή:</p>
              {
                date.place === 'online' ? (
                  <div className={s.date_online_address_container}>
                    <p className={s.date_online_address}>Zoom</p>
                    <FontAwesomeIcon icon={faLink} className={s.link_icon}/>
                  </div>
                ) : (
                  <p className={s.date_address}>Διεύθυνση</p>
                )
              }
            </div>
            <div>
              <p>Σχόλια:</p>
              <textarea
                disabled
                value='Θα με ενδιέφερε να γνωριστούμε καλύτερα για συνεργασία.'
              />
            </div>
            <h3>Ημερομηνία: 23/10/24</h3>
            <h3>Ώρα: 16:20</h3>
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
            date.status === 'responded' && (
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