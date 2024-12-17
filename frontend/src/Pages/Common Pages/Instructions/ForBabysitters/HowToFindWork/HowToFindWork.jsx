import React from "react";
import s from "./HowToFindWorkStyle.module.css";
import work_icon from "../../../../../Assets/Icons/work_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function HowToFindWork({isOpen, toggleInnerSections}) {

    return (
        <div className={s.who_is_allowed_the_voucher}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToFindWork")}
            >
                <p>Πώς βρίσκω εργασία;</p>
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
                        <img src={work_icon} alt="Work Icon" />
                        <div className={s.step_text}>
                            <p><span>Εγγράφεστε</span> στην εφαρμογή ως νταντά με τους <span>κωδικούς Taxis</span> σας. Θα χρειαστείτε επιπλέον να ορίσετε:</p>
                            <p className={s.inner}>Την <span>Εκπαίδευσή</span> σας μαζί με τα αντίστοιχα 
                                <span>πιστοποιητικά</span> και την <span>Εμπειρία</span> σας.
                            </p>
                            <p>Εφόσον έχετε ολοκληρώσει την εγγραφή σας ως νταντά μπορείτε:</p>
                            <ul>
                                <li>
                                    <p>Να επεξεργαστείτε το <span>βιογραφικος</span> σας.</p>
                                </li>
                                <li>
                                    <p>Να δημοσιεύσετε <span>αγγελία</span> εργασίας, στην οποία ορίζετε τον επιθυμητό χρόνο εργασίας,
                                        την διαθεσιμότητά σας, και τις υπηρεσίες που θέλετε να παρέχετε.
                                    </p>
                                </li>
                                <li>
                                    <p>Να εξετάσετε εισερχόμενες <span>αιτήσεις</span> από κηδεμόνες, και να έρθετε σε επικοινωνία 
                                        μαζί τους για <span>προγραμματισμό ραντεβού</span>.
                                    </p>
                                </li>
                                <li>
                                    <p>Να υπογράψετε <span>συμφωνητικό συνεργασίας</span> με κηδεμόνα.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToFindWork;
