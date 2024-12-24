import React from "react";
import s from "./HowToHandleDatesStyle.module.css";
import date_icon from "../../../../../Assets/Icons/date_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function HowToHandleDates({isOpen, toggleInnerSections}) {

    return(
        <div className={s.how_to_handle_dates}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToHandleDates")}
            >
                <p>Πώς διαχειρίζομαι τα Ραντεβού γνωριμίας μου;</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.inner_instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div className={s.inner_instruction_content}>
                    <div className={s.step}>
                        <div className={s.step_rect}></div>
                        <img src={date_icon} alt="Partnerships Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p>
                                        Μπορείτε να δείτε τα ραντεβού που σας έχουν αποστείλει κηδεμόνες, καθώς και την κατάσταση αυτών ανάλογα το χρώμα του πλαισίου
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε να προχωρήσετε σε συνεργασία με μια Οικογένεια,
                                       εφόσον έχει πραγματοποιηθεί το ραντεβού. 
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε να προβάλλετε λεπτομέρειες για το ραντεβού
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε να τροποποιήσετε κάποια στοιχεία του αιτήματος ραντεβού από μια οικογένεια (Πρέπει να αποδεχτεί το τροποποιημένο ραντεβού ο κηδεμόνας)
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε να δείτε τα αιτήματα ραντεβού που έχουν αποστείλει κηδεμόνες και να τα αποδεχτέιτε/απορρίψετε 
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowToHandleDates;