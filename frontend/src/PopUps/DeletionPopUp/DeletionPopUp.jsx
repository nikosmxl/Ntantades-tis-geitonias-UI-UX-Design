import React, { useState } from "react";
import s from "./DeletionPopUpStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function DeletionPopUp({ onDelete, onClose }) {
    const [isLoading, setIsLoading] = useState(false); // Όταν θα επιβεβαιώνει θα κάνει asyncronous tasks λογικά (θα θέλει λιγο χρονο για ενεργειες στο backend)
    const [isClosing, setIsClosing] = useState(false); // Για το animation

    const handleDelete = () => {
        setIsLoading(true);
        onDelete();
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

    return (
        <div className={s.popup_overlay}>
            <div className={`${s.popup_content} ${isClosing ? s.closed : s.open}`}>
                <h3>Επιθυμείτε να διαγράψετε το αντικείμενο;</h3>
                <div className={s.options}>
                    <button disabled={isLoading} className={s.cancel_button} onClick={handleClosePopup}>
                        <FontAwesomeIcon icon={faXmark} className={s.icon} />
                        Όχι
                    </button>
                    <button disabled={isLoading} className={s.confirm_button} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faCheck} className={s.icon}/>
                        Ναι
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletionPopUp;
