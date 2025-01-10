import React from "react";
import s from "./HowToHandlePartnershipsStyle.module.css";
import deal_icon from "../../../../Assets/Icons/deal_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function HowToHandlePartnerships({isOpen, toggleInnerSections}) {

    return (
        <div className={s.who_is_allowed_the_voucher}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToHandlePartnerships")}
            >
                <p>Πως διαχειρίζομαι τις συνεργασίες μου;</p>
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
                        <img src={deal_icon} alt="Partnerships Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p>
                                        Μπορείτε να δείτε τις <span>τρέχουσες συνεργασίες</span> σας με Οικογένειες καθώς και το <span>συμφωνητικό συνεργασίας </span> σας
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε να δείτε τις <span>μελλοντικές συνεργασίες</span> που έχετε υπογράψει, 
                                    </p>
                                </li>
                                <li>
                                    <p>
                                    Μπορείτε να δείτε τα <span>εισαερχόμενα συμφωνητικά Συνεργασίας</span> που έχουν υπογεγραφεί από τους κηδεμόνες, και να υπογράψετε για την έναρξη της συνεργασίας σας με την οικογένεια  
                                    </p>
                                </li>
                                <li>
                                    <p>Μπορείτε στο <span>ιστορικό συνεργασιών</span>, να δείτε τις συνεργασίες που έχετε ολοκληρώσει με οικογένειες στο παρελθόν</p>
                                </li>
                                <li>
                                    <p>Μπορείτε να ανανεώσετε τη συνεργασία σας με μια οικογένεια, εφόσον έχει περάσει η περίοδος συνεργασίας. 
                                        Εφόσον ο κηδεμόνας έχει ανανεώσει τη συνεργασία σας, θα σας ενεργοποιηθεί η επιλογή, για ανανέωση συνεργασίας.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToHandlePartnerships;