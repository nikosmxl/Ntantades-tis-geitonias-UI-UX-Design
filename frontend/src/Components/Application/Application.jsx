import s from "./ApplicationStyle.module.css"
import troll_prof from "../../Assets/Pictures/troll_prof.jpg"
import Timetable from "../Timetable/Timetable";
import { useState } from "react";
import ExpandButtons from "../ExpandButtons/ExpandButtons";
import { useNavigate } from "react-router-dom";

function Application({isParent = true, application_state = null, isHistory = false, isEditable = false, onDelete, onDecline, onAccept}){
    const [isExpanded, setIsExpanded] = useState(false);
    const exeiKleiseiRantebou = false; // Θα διαγραφεί αυτή η μεταβλητή στο μέλλον. Είναι προσωρινή.
    const applicationId = 1;
  
    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const navigate = useNavigate();

    const handleUserClick = () => {
      if (!isParent) return navigate('/babysitter/family-profile/1');

      navigate('/parent/babysitter-details/1');
    };

    return (
        <div className={s.application_with_buttons}>
            <div className={`${s.application} ${isExpanded ? s.open : ''} ${!isParent ? s.babysitter : ''} ${(isParent || (!isParent && isHistory)) && ( !isEditable && (application_state === 0 ? s.declined : application_state === 1 ? s.accepted : s.pending))} ${isHistory ? s.history : ''}`}>
                <div className={s.first_row}>
                    <div className={s.first_row_left_side}>
                        <img src={troll_prof} alt="Profile" onClick={handleUserClick}/>
                        <b className={s.name} onClick={handleUserClick}>Δήμητρα Χατζή</b>
                        {application_state !== null &&
                            <p>•</p>
                        }
                        {application_state === 0
                        ?
                            <p>Απορρίφθηκε</p>
                        :
                        application_state === 1
                        ?
                            <p>Έγινε αποδοχή</p>
                        :
                            <p>Εκκρεμεί...</p>
                        }
                    </div>
                    <div className={s.first_row_right_side}>
                        <p className={`${s.application_date} ${!isExpanded ? s.not_expanded : ''}`}>22/12/2024</p>
                        <div className={`${s.from_to} ${!isExpanded ? s.not_expanded : ''}`}>
                            <p><span>Από:</span> 25/12/2024</p>
                            <p><span>Εώς:</span> 25/06/2025</p>
                        </div>
                    </div>
                </div>
                <div className={s.second_row}>
                    <div className={s.second_row_left_side}>
                        <div className={s.row}>
                            <p><span>Χρόνος απασχόλησης:</span> Πλήρης</p>
                            <p><span>Περιοχή εξυπηρέτησης:</span> Καλλιθέα</p>
                        </div>
                        <div className={s.few_words}>
                            <p>Καλησπέρα, ενδιαφέρομαι για τον 2χρονο γιο μου, τον Στέφανο....</p>
                        </div>
                    </div>
                    <div className={s.second_row_right_side}>
                        <Timetable width="270px" height="200px" isEnabled={false} />
                    </div>
                </div>
                {isParent && application_state === 1 && !isHistory &&
                    <div className={s.third_row}>
                        <p className={`${!isExpanded ? s.not_expanded : ''}`}>Η νταντά άλλαξε τα στοιχεία του ραντεβού</p>
                        <button
                          onClick={() => {
                            exeiKleiseiRantebou ? 
                            navigate('../dates/', {relative: 'path'}) :
                            navigate('../edit-date/', {relative: 'path'})
                          }}
                        >{exeiKleiseiRantebou ? "Προβολή Ραντεβού" : "Αίτημα Ραντεβού"}</button>
                    </div>
                }
            </div>
            <ExpandButtons isExpanded={isExpanded} toggleIsExpanded={toggleIsExpanded}
                showOptionsButtons={!isHistory} showDeleteButton={isParent} 
                showDeclineButton={!isParent} showEditButton={isParent && isEditable}
                showAcceptButton={!isParent} onDelete={onDelete}
                onEdit={() => navigate(`/parent/applications/application-create/${applicationId}`)}
                onAccept={onAccept}
                onDecline={onDecline}
            />
        </div>
    )
}

export default Application;