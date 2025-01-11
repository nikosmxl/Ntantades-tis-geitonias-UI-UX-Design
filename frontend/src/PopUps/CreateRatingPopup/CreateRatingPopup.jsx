import React, { useState } from 'react';
import s from './CreateRatingPopupStyle.module.css';
import xIcon from '../../Assets/Icons/X-icon.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import Stars from '../../Components/Stars/Stars';

const CreateRatingPopup = ({ babysitter, onCreate, onClose }) => {
  const [isLoading, setIsLoading] = useState(false); // Όταν θα επιβεβαιώνει θα κάνει asyncronous tasks λογικά (θα θέλει λιγο χρονο για ενεργειες στο backend)
  const [isClosing, setIsClosing] = useState(false); // Για το animation
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState('');

  const handleCreate = () => {
      setIsLoading(true);
      onCreate();
      handleClosePopup();
      setIsLoading(false);
  };

  const handleClosePopup = () => {
      setIsClosing(true); // Για να ενεργοποιηθεί το animation
      setTimeout(() => {
          setIsLoading(true);
          onClose(); // Κλείνει το PopUp αφού τελειώσει το animation
          setIsLoading(false);
      }, 300);
  };

  const onRatingTextChange = (e) => {
    setRatingText(e.target.value.trim());
  };

  return (
    <div className={s.popup_overlay}>
      <div className={`${s.popup_content} ${isClosing ? s.closed : s.open}`}>
        <img
          src={xIcon}
          className={s.popup_close_button}
          onClick={handleClosePopup}
        />
        <h3>Αξιολογήστε την {babysitter.name}</h3>
        <Stars 
          rating={rating}
          showRating={false}
          onChange={(newRating) => setRating(newRating)}
          isEnabled={true}
          color={'#E9BA00'}
          size='big'
        />
        <div className={s.rating_text_container}>
          <h3>Αφήστε την κριτική σας:</h3>
          <textarea
            className={s.rating_text}
            placeholder='Γράψτε την κριτική σας εδω...'
            value={ratingText}
            onChange={onRatingTextChange}
          />
        </div>
        
        <div className={s.options}>
          <button disabled={isLoading} className={s.confirm_button} onClick={handleCreate}>
            <FontAwesomeIcon icon={faStar} className={s.icon}/>
            Υποβολή
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default CreateRatingPopup;