import React, { useState } from "react";
import s from "./PartnershipAgreementPopUpStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function PartnershipAgreementPopUp({ onSubmit, onClose, gender, name, surname }) {
    const [isLoading, setIsLoading] = useState(false); // Όταν θα επιβεβαιώνει θα κάνει asyncronous tasks λογικά (θα θέλει λιγο χρονο για ενεργειες στο backend)
    const [isClosing, setIsClosing] = useState(false); // Για το animation

    const handleSubmit = () => {
        setIsLoading(true);
        onSubmit();
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
                <h3>Προσοχή!</h3>
                <h3> Πρόκειται να υπογράψετε συμφωνία για συνεργασία με {gender === 0 ? "τον" : "την"} <span className={s.fullname}>{name} {surname}</span>.
                    Είστε σίγουροι πως επιθυμείτε να συνεχίσετε;</h3>
                <div className={s.options}>
                    <button disabled={isLoading} className={s.cancel_button} onClick={handleClosePopup}>
                        <FontAwesomeIcon icon={faXmark} className={s.icon} />
                        Όχι
                    </button>
                    <button disabled={isLoading} className={s.confirm_button} onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faCheck} className={s.icon}/>
                        Ναι
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PartnershipAgreementPopUp;
