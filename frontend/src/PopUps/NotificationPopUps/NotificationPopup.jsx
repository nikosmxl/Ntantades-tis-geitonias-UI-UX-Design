import React, { useEffect, useState } from "react";
import s from "./NotificationPopUpStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function NotificationPopUp({ status, message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Κλείσιμο μετά από 5 δευτερόλεπτα
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 6500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    isVisible && (
        <div className={`${s.notification_popup} ${status === "success" ? s.success : status === "fail" ? s.fail : s.save}`}>
            <div className={s.row}>
                <div>
                    <div className={s.rect}></div>
                    <p>{message}</p>
                </div>
                <FontAwesomeIcon icon={faXmark} className={s.xmark} 
                style={{ color: "white", stroke: "#000000", strokeWidth: 4 }}
                onClick={handleClose}
                />
            </div>
        </div>
    )
  );
}

export default NotificationPopUp;
