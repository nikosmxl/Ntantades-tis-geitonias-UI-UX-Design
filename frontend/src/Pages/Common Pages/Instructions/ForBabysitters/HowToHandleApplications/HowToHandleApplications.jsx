import React from "react";
import s from "./HowToHandleApplicationsStyle.module.css";
import papers_icon from "../../../../../Assets/Icons/papers_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faEye } from "@fortawesome/free-solid-svg-icons";

function HowToHandleApplications( {isOpen, toggleInnerSections}) {

    return ( 
        <div className={s.how_to_handle_applications}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToHandleApplications")}               
            >
                <p>Πώς διαχειρίζομαι τις Αιτήσεις μου;</p>
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
                        <img src={papers_icon} alt="Applications Icon" />
                        <div className={s.step_text} >
                            <ul>
                                <li>
                                    <p>
                                        Μπορείτε να δείτε τις εισερχόμενες αιτήσεις από Οικογένειες, 
                                        ενώ ενημερώνεστε με popup ειδοιποίηση νέες αιτήσεις από οικογένειες
                                    </p>
                                </li>
                                <li>
                                    <div className={s.row}>
                                        <p>Μπορείτε να προβάλετε αναλυτικά μια αίτηση με το κουμπί  
                                            <FontAwesomeIcon icon={faEye} className={s.eye_logo}/> εμφανίζοντας 
                                            την ημερομηνία υποβολής τον χρόνο απασχόλησης,την περιοχή εξυπηρέτησης, 
                                            τις ημερομηνίες έναρξης & λήξης απασχόλησης, τον πίνακα με τις ώρες και 
                                            ημέρες που επιθυμεί η οικογένεια, και το σχόλιο που έχει υποβάλει η 
                                            οικογένεια στην αίτηση 
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <p>Μπορείτε να διαχειριστείτε τις αιτήσεις που σας έχουν αποστείλει οι οικογένειες,
                                         κάνοντας αποδοχή ή απόρριψη 
                                    </p>
                                </li>
                                <li>
                                    <p>Μπορείτε στο ιστορικό αιτήσεων, να δείτε τις αιτήσεις από οικογένειες
                                        που έχετε αποδεχτεί ή απορρίψει στο παρελθόν
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

export default HowToHandleApplications;