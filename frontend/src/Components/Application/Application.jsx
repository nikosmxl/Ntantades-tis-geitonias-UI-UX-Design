import s from "./ApplicationStyle.module.css"
import Timetable from "../Timetable/Timetable";
import { useMemo, useState, useEffect } from "react";
import ExpandButtons from "../ExpandButtons/ExpandButtons";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import { getDateFromMs, getDateFromObj, getFormattedDate } from '../../utils/date';

function Application({isParent = true, application, isHistory = false, isEditable = false, onDelete, onDecline, onAccept, onNavigate = null}){
    const [user, setUser] = useState({});

    const fetchData = async () => {
      if (isParent) {
        const babysitterSnap = await getDoc(application.babysitter);
        const fetchedBabysitterData = babysitterSnap.data();
        setUser({ ...fetchedBabysitterData, id: application.babysitter.id });
      } else {
        const parentSnap = await getDoc(application.parent);
        const fetchedParentData = parentSnap.data();
        setUser({ ...fetchedParentData, id: application.parent.id });
      }
    };

    useEffect(() => {
      fetchData();
    }, [application]);

    const [isExpanded, setIsExpanded] = useState(false);
    const exeiKleiseiRantebou = application?.date != null; // Θα διαγραφεί αυτή η μεταβλητή στο μέλλον. Είναι προσωρινή.

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const navigate = useNavigate();

    const handleUserClick = () => {
      if (onNavigate != null) onNavigate();

      if (!isParent) return navigate(`/babysitter/parent-details/${user?.id}`);

      navigate(`/parent/babysitter-details/${user?.id}`);
    };

    const status = useMemo(() => {
      switch (application.status) {
        case 'decline':
          return 'Απορρίφθηκε';
        case 'accept':
          return 'Έγινε αποδοχή';
        case 'sent':
          return 'Εκκρεμεί';
        default:
          return '';
      }
    }, [application]);

    return (
        <div className={s.application_with_buttons}>
            <div className={`${s.application} ${isExpanded ? s.open : ''} ${!isParent ? s.babysitter : ''} ${(isParent || (!isParent && isHistory)) && ( !isEditable && (application.status === 'decline' ? s.declined : application.status === 'accept' ? s.accepted : s.pending))} ${isHistory ? s.history : ''}`}>
                <div className={s.first_row}>
                    <div className={s.first_row_left_side}>
                        <img src={user?.profilePicture} alt="Profile" onClick={handleUserClick}/>
                        <b className={s.name} onClick={handleUserClick}>{user?.name} {user?.surname}</b>
                        { application.status !== 'saved' && <p>•</p> }
                        <p>{status}</p>
                    </div>
                    <div className={s.first_row_right_side}>
                        <p className={`${s.application_date} ${!isExpanded ? s.not_expanded : ''}`}>{getFormattedDate(getDateFromMs(application.dateCreated))}</p>
                        <div className={`${s.from_to} ${!isExpanded ? s.not_expanded : ''}`}>
                            <p><span>Από:</span> {
                              application.startingDate === 'Anytime' ? 'Άμεσα' : getFormattedDate(getDateFromObj(application.startingDate))
                            }</p>
                            <p><span>Εώς:</span> {
                              application.endingDate === 'Anytime' ? 'Αόριστο' : getFormattedDate(getDateFromObj(application.endingDate))
                            }</p>
                        </div>
                    </div>
                </div>
                <div className={s.second_row}>
                    <div className={s.second_row_left_side}>
                        <div className={s.row}>
                            <p><span>Χρόνος απασχόλησης:</span> {application.workingHours}</p>
                            <p><span>Δήμος εξυπηρέτησης:</span> {user?.area}</p>
                        </div>
                        <div className={s.few_words}>
                            <p>{application.fewWords}</p>
                        </div>
                    </div>
                    <div className={s.second_row_right_side}>
                        <Timetable width="270px" height="200px" isEnabled={false} checkedSlots={application.availability}/>
                    </div>
                </div>
                {isParent && status === 'accept' && !isHistory &&
                    <div className={s.third_row}>
                        <p className={`${!isExpanded ? s.not_expanded : ''}`}>Η νταντά άλλαξε τα στοιχεία του ραντεβού</p>
                        <button
                          onClick={() => {
                            if (onNavigate != null) onNavigate();
                            exeiKleiseiRantebou ? 
                            navigate('../dates/', {relative: 'path'}) :
                            navigate('../edit-date/', {relative: 'path'});
                          }}
                        >{exeiKleiseiRantebou ? "Προβολή Ραντεβού" : "Αίτημα Ραντεβού"}</button>
                    </div>
                }
            </div>
            <ExpandButtons isExpanded={isExpanded} toggleIsExpanded={toggleIsExpanded}
                showOptionsButtons={!isHistory} showDeleteButton={isParent} 
                showDeclineButton={!isParent} showEditButton={isParent && isEditable}
                showAcceptButton={!isParent} onDelete={onDelete}
                onEdit={() => navigate(`/parent/applications/application-create/${application.id}`)}
                onAccept={onAccept}
                onDecline={onDecline}
            />
        </div>
    )
}

export default Application;