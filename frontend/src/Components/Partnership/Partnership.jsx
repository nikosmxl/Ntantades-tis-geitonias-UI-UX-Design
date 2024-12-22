import s from "./PartnershipStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import troll_prof from "../../Assets/Pictures/troll_prof.jpg"
import Timetable from "../Timetable/Timetable";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

function Partnership({isParent = true, isRunning = true, isFuture = false, isSent = false, isPending = false, isHistory = false, isEditable = false}){
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [number, setNumber] = useState(1);
    const perioxes = ['ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ', 'ΔΗΜΟΣ ΠΕΙΡΑΙΩΣ'];
    const [perioxh, setPerioxh] = useState('ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ');
    const [availabilityList, setAvailabilityList] = useState([ [0, 1], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4] ]);
    
    const sample = {
        "signedBy": [],
        "isSentTo": 123,
        "answer": null,
        "ParentName": "Δήμητρα Χατζή",
        "BabysitterName": "Γεωργία Χατζηνικολάου",
        //Στοιχεια και των δυο
        "placeOfService": {
            "ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ": ["Τζιτζιφιές", "Αγία Ελεούσα"],
        },
        "address": "Κωνσταντινουπόλεως 213",
        "languagesKnowledge": [
            "Αγγλικά",
            "Γαλλικά"
        ],
        "specialties": ["Νοηματική"],
        "childrenTransportation": "Με Ι.Χ. Οικογένειας",
        "services": [
            "Μαγειρέμα",
            "Καθαρισμός Σπιτιού",
            "Βοήθεια με μαθήματα",
            "Δραστηριότητες Εξωτερικού Χώρου"
        ],
        "workingHours": "Πλήρης απασχόληση",
        "availability": availabilityList,
        "partnershipStart": "Μια ημερομινια",
        "partnershipEnd": "Μια ημερομινια",
        "fewWords": "Είμαι ευγενική, υπομονετική, σεβαστική και πολύ αγαπημένη με τα παιδιά! Μου αρέσει αυτό που κάνω για αυτό το κάνω με όρεξη και μεράκι. Σπούδασα στο Πανεπιστήμιο της Πάτρας Βρεφονηπιοκομία και έχω κάνει και σεμινάρια με τίτλο 'Επιστήμη της Υγείας', μαζί με σεμινάρια φωνηού φροντίδας. Θα χαρώ πολύ να συνεργαστούμε και να μπορέσω να είμαι χρήσιμη και να προσφέρω!",
        "familyFewWords": "Λιγα λογια εδω",
        "childrenNumber": 2,
        "childrenInfo": [
            {
                "age": 2,
                "sex": 0,
                "AMEA": 0,
                "allergies": 0,
                "fewWords": "Μπλα μπλα...",
            },
            {
                "age": 2,
                "sex": 0,
                "AMEA": 0,
                "allergies": 0,
                "fewWords": "Μπλα μπλα...",
            },
        ],
        "pets": 0,
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const isPartnershipOver = false;
    const isMonthCompleted = true;

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={s.partnership_with_buttons}>
            <div className={`${s.partnership} ${isExpanded ? s.open : ''} ${((isParent && isSent) || isHistory) ? (isPending ? s.pending : s.declined) : ''}`}>
                {isRunning && 
                    <span className={`${s.partnership_dot} ${!isParent || isExpanded || !isMonthCompleted ? s.disabled : ''}`}></span>
                }
                <div className={s.partnership_row}>
                    <img src={troll_prof} alt="Profile" />
                    <div className={s.second_column}>
                        <p><span>Ονοματεπώνυμο:</span>{sample.name}</p>
                        <p><span>Χρόνος απασχόλησης:</span>{sample.working_hours}</p>
                        <div className={`${s.timetable_to_hide} ${!isExpanded ? s.hidden : ''}`}>
                            <p className={s.underline}><span>Διαθεσιμότητα και ώρες</span></p>
                            <div>
                                <Timetable width="360px" height="200px" isEnabled={false} checkedSlots={sample.availability} onChange={setAvailabilityList} />
                            </div>
                        </div>
                    </div>
                    <div className={s.third_column}>
                        <div className={`${s.section_to_hide} ${!isExpanded ? s.hidden : ''}`}>
                            <p className={s.underline}><span>Περιοχές εξυπηρέτησης</span></p>
                            <div className={s.dropdown}>
                                <Dropdown selectedOption={perioxh} placeholder={null} options={perioxes} onChange={setPerioxh}/>
                                <div className={s.inner_dropdown}>
                                    <Dropdown selectedOption={perioxh} placeholder={null} options={perioxes} onChange={setPerioxh}/>
                                </div>
                            </div>
                            <p><span>Οδός εξυπηρέτησης:</span>{sample.address}</p>
                        </div>
                        <p className={s.underline}><span>Ημερομηνία έναρξης συνεργασίας</span></p>
                        <div className={s.dropdown_row}>
                            <Dropdown selectedOption={number} placeholder={null} options={numbers} onChange={setNumber}/>
                            <Dropdown selectedOption={number} placeholder={null} options={numbers} onChange={setNumber}/>
                            <Dropdown selectedOption={number} placeholder={null} options={numbers} onChange={setNumber}/>
                        </div>
                        <div className={`${s.dropdown_to_hide} ${!isExpanded ? s.hidden : ''}`}>
                            <p className={s.underline}><span>Ημερομηνία λήξης συνεργασίας</span></p>
                            <div className={s.dropdown_row}>
                                <Dropdown selectedOption={number} placeholder={null} options={numbers} onChange={setNumber}/>
                                <Dropdown selectedOption={number} placeholder={null} options={numbers} onChange={setNumber}/>
                                <Dropdown selectedOption={number} placeholder={null} options={numbers} onChange={setNumber}/>
                            </div>
                        </div>
                    </div>
                    {((isParent && isSent) || isHistory) && (
                        isPending ? (
                            <p className={`${s.status} ${s.yellow} ${!isExpanded ? s.collapsed : ''}`}>Εκκρεμεί απάντηση...</p>
                        ):(
                            <p className={`${s.status} ${s.red} ${!isExpanded ? s.collapsed : ''}`}>Απορρίφθηκε</p>
                        )
                    )}
                    <p className={`${s.partnership_date} ${!isExpanded ? s.collapsed : ''}`}>25/12/2024</p>
                </div>
                {(isRunning || isHistory || isFuture) &&
                    <div className={`${s.partnership_buttons_row} ${!isExpanded ? s.collapsed : ''}`}>
                        <button className={s.view_agreement_button}>
                            ΠΡΟΒΟΛΗ ΣΥΜΦΩΝΗΤΙΚΟΥ ΣΥΝΕΡΓΑΣΙΑΣ
                        </button>
                        {isRunning &&
                            <>
                                {isParent &&
                                    <button className={`${s.end_partnership_button} ${!isPartnershipOver ? s.disabled : ''}`}>
                                        ΛΗΞΗ ΣΥΝΕΡΓΑΣΙΑΣ
                                    </button>
                                }
                                <button className={`${s.complete_month_button} ${!isMonthCompleted ? s.disabled : ''}`}>
                                    ΟΛΟΚΛΗΡΩΣΗ ΜΗΝΑ
                                    <span className={s.dot}></span>
                                </button>
                            </>
                        }
                    </div>
                }
            </div>
            <div className={s.buttons}>
                <button className={s.show_more_button} onClick={toggleIsExpanded}>
                    {isExpanded 
                    ?
                        <FontAwesomeIcon icon={faEye} className={s.expanded} />
                    :
                        <FontAwesomeIcon icon={faEyeSlash} className={s.not_expanded} />
                    }
                </button>
                <div className={`${s.smooth_transition} ${isExpanded && isEditable ? s.open : ''}`}>
                    <div className={s.options_buttons}>
                        {isParent && isEditable &&
                            <button className={s.delete_button}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        }
                        {isEditable &&
                            <button className={s.edit_button}>
                                <FontAwesomeIcon icon={faPencil} />
                            </button>
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Partnership;