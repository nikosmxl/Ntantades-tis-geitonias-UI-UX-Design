import React, { useState } from "react";
import s from "./NotificationStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Notification({context, width}) {
    const [isVisible, setIsVisible] = useState(true);

    const handleOnClose = () => {
        setIsVisible(false);
    }

    return (
        <div className={`${s.notification} ${!isVisible && s.invisible}`} style={{width: width}}>
            <p>{context}</p>
            <div className={s.time_and_X}>
                <p>27 λεπτά πρίν</p>
                <FontAwesomeIcon icon={faXmark} onClick={handleOnClose} className={s.icon}/>
            </div>
        </div>
    );
}

export default Notification;
