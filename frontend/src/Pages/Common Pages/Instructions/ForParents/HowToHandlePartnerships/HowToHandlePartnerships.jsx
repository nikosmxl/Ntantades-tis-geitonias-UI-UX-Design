import React from "react";
import s from "./HowToHandlePartnershipsStyle.module.css";
import deal_icon from "../../../../../Assets/Icons/deal_icon.png"
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
                                    <p>Μπορείτε να δείτε την <span>τρέχουσα συνεργασία</span> σας με Νταντάδες ή το <span>συμφωνητικό συνεργασίας </span>
                                        σας, να πραγματοποιήσετε <span>πληρωμή</span> της Νταντάς με την <span>Ολοκλήρωση Μήνα</span>, 
                                        καθώς και να <span>λήξετε την συνεργασία</span> (αφού τελειώσει η συνεργασία σας).
                                    </p>
                                </li>
                                <li>
                                    <p>Μπορείτε να δείτε τις <span>μελλοντικές συνεργασίες</span> που έχετε υπογράψει, 
                                        καθώς και να δείτε το <span>συμφωνητικό συνεργασίας</span> σας.
                                    </p>
                                </li>
                                <li>
                                    <p>Μπορείτε να <span>δείτε τα συμφωνητικά που έχετε στείλει</span> και να <span>ενημερώνεστε για την 
                                        πορεία τους</span> με βάση το χρώμα του πλαισίου (<span className={s.yellow_text}>κίτρινο</span> = εκκρεμεί,
                                        <span className={s.red_text}> κόκκινο</span> = απόρριψη).
                                    </p>
                                </li>
                                <li>
                                    <p>Μπορείτε να δείτε τις <span>νταντάδες που έχετε πραγματοποιήσει ραντεβού</span> και να υπογράψετε συμφωνητικό μαζί τους.</p>
                                </li>
                                <li>
                                    <p>Μπορείτε <span>να δείτε, να επεξεργαστείτε, και να υποβάλλετε</span> τα συμφρωνητικά Συνεργασίας 
                                        τα οποία έχετε <span>πρόχειρα αποθηκεύσει</span>.
                                    </p>
                                </li>
                                <li>
                                    <p>Μπορείτε να <span>ανανεώσετε</span> τη συνεργασία σας με μια Νταντά, εφόσον <span>έχει περάσει 
                                        η περίοδος συνεργασίας</span>, και αφού <span>επιβεβαιώσει</span> την ανανέωση και η Νταντά.
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
