import React from "react";
import s from "./HowToHandleApplicationsStyle.module.css";
import papers_icon from "../../../../Assets/Icons/papers_icon.png"
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
                                    <p>Μπορείτε να δείτε τις αιτήσεις που έχετε υποβάλει οριστικά σε Νταντάδες, 
                                       καθώς και ποιες από αυτές έχουν αποδεχτεί/απορριφθεί από Νταντά</p>
                                </li>
                                <li>
                                    <div className={s.row}>
                                        <p>
                                            Μπορείτε να προβάλετε αναλυτικά μια αίτηση με το κουμπί  
                                            <FontAwesomeIcon icon={faEye} className={s.eye_logo}/> εμφανίζοντας 
                                            εμανίζοντας τον χρόνο απασχόλησης, την περιοχή εξυπηρέτησης, τις ημερομηνίες έναρξης & λήξης απασχόλησης, 
                                            τον πίνακα με τις ώρες και ημέρες που επιθυμείτε στην αίτηση, το σχόλιο που έχετε υποβάλει αίτηση, 
                                            καθώς και να αιτηθέιτε ραντεβού με τη Νταντά ή να προβάλετε τις λεπτομέρειες του ραντεβού σν συτό έχει ήδη κανονιστεί  
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε για τις αποδεχούμενες αιτήσεις να κάνετε αίτημα ράντεβου με τη Νταντά (θα σας ανακατευθύνει στη σελίδα Ραντεβού), 
                                        ή να διαγράψετε την αίτηση, ακόμα και αν η Νταντά έχει αποδεχτεί
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορέιτε να δείτε τις αιτήσεις που έχετε αποθηκεύσει προσωρινά, και να τις επεξεργαστείτε ή να τις διαγράψετε
                                    </p>
                                </li>
                                 <li>
                                    <p>
                                        Μπορείτε στο ιστορικό αιτήσεων, να δείτε τις αιτήσεις που έχετε στείλει σε Νταντάδες στο παρελθόν, 
                                        και ποιες έχουν γίνει αποδεκτές ή έχουν απορριφθεί από αυτές
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