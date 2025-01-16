import { useEffect, useState } from "react";
import s from "./ApplicationCreateStyle.module.css"
import FamilyInfo from "../../../Components/FamilyInfo/FamilyInfo";
import Checkbox from "../../../Components/Checkbox/Checkbox";
import Timetable from "../../../Components/Timetable/Timetable";
import DateDropdowns from "../../../Components/DateDropdowns/DateDropdowns";
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import ConfirmationPopUp from "../../../PopUps/ConfirmationPopUp/ConfirmationPopUp";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

function ApplicationCreate(){
    const fullname = "Μπάμπης Μπαμπάκης";
    const stateOfResidence = "ΔΗΜΟΣ ΑΧΑΡΝΕΣ";
    const [address, setAddress] = useState("");
    
    const description = "";
    const kids = [{id: 1, age: 1, gender: "boy", hasDisabilities: false, hasAllergies: false, description: ''}];
    const hasPets = false;

    const [workingHours, setWorkingHours] = useState(null);

    const [availabilityList, setAvailabilityList] = useState([]);

    const [startingDate, setStartingDate] = useState({});
    const [endingDate, setEndingDate] = useState({});

    const specialties = ["Disabled"];
    const [transportation, setTransportation] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [services, setServices] = useState([]);

    const [fewWords, setFewWords] = useState("");

    const [error, setError] = useState(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

    const params = useParams();

    const dictionaries = {
        languages: {
            English: "Αγγλικά",
            French: "Γαλλικά",
            Italic: "Ιταλικά",
            Spanish: "Ισπανικά",
            German: "Γερμανικά",
            Russian: "Ρώσικα",
            Arabic: "Αραβικά"
        },
        services: {
            Cooking: "Μαγείρεμα",
            Cleaning: "Καθαρισμός σπιτιού",
            Ironing: "Σιδέρωμα",
            "First-aid": "Α` βοήθειες",
            BabysitterCertificate: "Πιστοποίηση νταντάς",
            HomeworkHelp: "Βοήθεια με μαθήματα",
            Trips: "Εκδρομές / Επισκέψεις",
            EscortActivities: "Συνοδεία σε Δραστηριότητες",
            OutsideActivities: "Δραστηριότητες Εξωτερικού Χώρου",
            AvailableForEmergency: "Έκτακτη Διαθεσιμότητα",
            EnglishNativeSpeaker: "English native speaker",
            HospitalityOnTheirOwnPlace: "Φιλοξενία στην οικία μου"
        }
    };

    const navigate = useNavigate();

    const openConfirmPopup = () => {
        setIsConfirmPopupOpen(true);
    }

    const handleConfirmPopupClose = () => {
        setIsConfirmPopupOpen(false); // Κλεινει το PopUp
    };

    const onConfirm = () => {
      navigate('/applications', { state: { status: 'sent' }});
    }

    const openCancelPopup = () => {
        setIsCancelPopupOpen(true);
    }

    const handleCancelPopupClose = () => {
        setIsCancelPopupOpen(false); // Κλεινει το PopUp
    };

    const onCancel = () => {
      navigate('/babysitter-details/1');
    };

    const handleSave = () => {
      navigate('/applications', { state: { status: 'saved' }});
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCheckboxChange = (state, setState, value) => {
        if (state.includes(value)) {
            setState(state.filter(item => item !== value));
        } else {
            setState([...state, value]);
        }
    };

    const handleFewWordsChange = (e) => {
        e.preventDefault();
        setFewWords(e.target.value.trim());
    };

    const handleSubmit = () => {
        if (error){
            setIsErrorVisible(true);
            return;
        }
        openConfirmPopup();
    }

    useEffect(() => {
        const missingFields = new Set();

        if (address === null){
            missingFields.add("Οδός και Αριθμός κατοικίας");
        }
        if (workingHours === null){
            missingFields.add("Χρόνος απασχόλησης");
        }
        if (availabilityList.length === 0){
            missingFields.add("Ημερολόγιο απασχόλησης");
        }
        if (Object.keys(startingDate).length === 0){
            missingFields.add("Ημερομηνία έναρξης συνεργασίας");
        }
        if (Object.keys(endingDate).length === 0){
            missingFields.add("Ημερομηνία λήξης συνεργασίας");
        }
    
        if (missingFields.size === 0) {
            setError(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
            const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${Array.from(missingFields).join(", ")}`;
            setError(errorMessage);
        }
    }, [address, workingHours, availabilityList, startingDate, endingDate]);
    
    return (
        <div className={s.container}>
            <div className={s.breadcrumbs}>
              <Breadcrumbs
                breadcrumbItems={[
                  { label: 'Αρχική Σελίδα', route: ''},
                  { label: 'Βρείτε νταντά', route: 'babysitter-search'},
                  { label: 'Δημιουργία νέας Αίτησης', route: '.'},
                ]}
              />
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Βρείτε Νταντά</p>
                <p>{">"}</p>
                <p>Δημιουργία νέας Αίτησης</p>
            </div>

            <h3 className={s.title}>Δημιουργία νέας Αίτησης</h3>
            <p className={s.note}>Τα πεδία με <span>Κόκκινο</span> είναι αμετάβλητα. Επεξεργαστείτε το Προφίλ για να τα αλλάξετε.</p>
            <p className={s.note}>Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά.</p>
            <hr/>

            <div className={s.application_create_container}>
                <div className={s.parent_fullname}>
                    <label htmlFor="fullname">Ονοματεπώνυμο Κηδεμόνα:</label>
                    <input type="text" id="fullname" value={fullname} readOnly />
                </div>

                <div className={s.place_of_residence}>
                    <label htmlFor="state">Νομός κατοικίας:</label>
                    <input type="text" id="state" value={stateOfResidence} readOnly />
                </div>

                <div className={s.address}>
                    <label htmlFor="address">Οδός και Αριθμός Διαμονής*:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="Η διεύθυνσή σας..."
                    />
                </div>

                <div className={s.family_info}>
                    <FamilyInfo
                        isEditable={false}
                        description={description}
                        kids={kids}
                        hasPets={hasPets}
                        isForApplication
                    />
                </div>

                <div className={s.working_hours}>
                    <b>Χρόνος απασχόλησης*</b>
                    {["Πλήρης απασχόληση", "Μερική απασχόληση"].map(option => (
                        <Checkbox
                            key={option}
                            name="workinghrs"
                            isChecked={workingHours === option}
                            onChange={() => setWorkingHours(option)}
                            label={option === "Πλήρης απασχόληση" ? "Πλήρης απασχόληση" : "Μερική απασχόληση"}
                        />
                    ))}
                </div>

                <div className={s.calendar_area}>
                    <b>Ημερολόγιο απασχόλησης*</b>
                    <Timetable width="400px" height="220px" onChange={setAvailabilityList} checkedSlots={availabilityList} />
                </div>

                <div className={s.starting_date}>
                    <b>Ημερομηνία Έναρξης Συνεργασίας*</b>
                    <Checkbox 
                        name={"startingDate"}
                        isChecked={startingDate === "Anytime"}
                        onChange={() => {
                            if (startingDate === "Anytime") {
                                setStartingDate({}); // Επαναφορά του startingDate για να είναι editable
                            } else {
                                setStartingDate("Anytime"); // Ορισμός ως "Anytime"
                            }
                        }}
                        label={"Άμεσα διαθέσιμος/η"}
                    />
                    <div className={s.date_dropdowns_area}>
                        <DateDropdowns
                            day={startingDate?.day ?? null}
                            month={startingDate?.month ?? null}
                            year={startingDate?.year ?? null}
                            isEnabled={startingDate !== "Anytime"}
                            onChange={(newStartDate) => {
                                setStartingDate(newStartDate);
                            }}
                        />
                    </div>
                </div>

                <div className={s.ending_date}>
                    <b>Ημερομηνία Λήξης Συνεργασίας*</b>
                    <Checkbox 
                        name={"endingDate"}
                        isChecked={endingDate === "Anytime"}
                        onChange={() => {
                            if (endingDate === "Anytime") {
                                setEndingDate({}); // Επαναφορά του startingDate για να είναι editable
                            } else {
                                setEndingDate("Anytime"); // Ορισμός ως "Anytime"
                            }
                        }}
                        label={"Αορίστου χρόνου"}
                    />
                    <div className={s.date_dropdowns_area}>
                        <DateDropdowns
                            day={endingDate?.day ?? null}
                            month={endingDate?.month ?? null}
                            year={endingDate?.year ?? null}
                            isEnabled={endingDate !== "Anytime"}
                            onChange={(newStartDate) => {
                                setEndingDate(newStartDate);
                            }}
                        />
                    </div>
                </div>

                <div className={s.checkbox_area}>
                    <b>Ειδίκευση σε</b>
                    {["Disabled", "Sign-Language"].map(option => (
                        <Checkbox
                            key={option}
                            name={"specialties"}
                            isChecked={specialties.includes(option)}
                            readOnly
                            isEnabled={false}
                            isRed
                            label={option === "Disabled" ? "ΑμεΑ" : "Νοηματική"}
                        />
                    ))}
                </div>

                <div className={s.checkbox_area}>
                    <b>Μετακίνηση παιδιών</b>
                    {["BabysitterCar", "FamilyCar"].map(option => (
                        <Checkbox
                            key={option}
                            name={"transportation"}
                            isChecked={transportation.includes(option)}
                            onChange={() => handleCheckboxChange(transportation, setTransportation, option)}
                            label={option === "BabysitterCar" ? "Με Ι.Χ. Νταντάς" : "Με Ι.Χ. Οικογένειας"}
                        />
                    ))}
                </div>

                <div className={s.checkbox_area}>
                    <b>Γνώσεις ξένων γλωσσών</b>
                    {Object.entries(dictionaries.languages).map(([language, translation]) => (
                        <Checkbox
                            key={language}
                            name={"language"}
                            isChecked={languages.includes(language)}
                            onChange={() => handleCheckboxChange(languages, setLanguages, language)}
                            label={translation}
                        />
                    ))}
                </div>
                
                <div className={s.checkbox_area}>
                    <b>Υπηρεσίες</b>
                    {Object.entries(dictionaries.services).map(([service, translation]) => (
                        <Checkbox
                            key={service}
                            name={"services"}
                            isChecked={services.includes(service)}
                            onChange={() => handleCheckboxChange(services, setServices, service)}
                            label={translation}
                        />
                    ))}
                </div>
                <div className={s.few_words_area}>
                    <b>Λίγα λόγια</b>
                    <textarea
                        className={s.few_words}
                        value={fewWords}
                        placeholder="Λίγα λόγια..."
                        onChange={handleFewWordsChange}
                    />
                </div>

                {isErrorVisible && error &&
                    <ErrorFields error={error} onXmarkClick={() => {setIsErrorVisible(false)}} />
                }

                <div className={s.buttons}>
                    <button
                        className={`${s.button} ${s.cancel}`}
                        onClick={openCancelPopup}
                    >
                        <FontAwesomeIcon icon={faXmark} fontSize={'18px'} />
                        Ακύρωση
                    </button>
                    
                    <button
                        className={`${s.button} ${s.save}`}
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faFloppyDisk} fontSize={'18px'} />
                        Προσωρινή Αποθήκευση
                    </button>
                    
                    <button
                        className={`${s.button} ${s.submit}`}
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faGavel} fontSize={'18px'} />
                        Οριστική Υποβολή
                    </button>
                </div>
            </div>
            {isConfirmPopupOpen && 
                <ConfirmationPopUp 
                    context={"Είστε σίγουρος ότι θέλετε να υποβάλετε οριστικά την αίτηση;"} 
                    onConfirm={onConfirm} 
                    onClose={handleConfirmPopupClose} 
                />
            }
            {isCancelPopupOpen && 
                <ConfirmationPopUp
                    context={params.appId == null
                            ? 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την δημιουργία της αίτησης; Η αίτηση δεν θα αποθηκευτεί." 
                            : 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την επεξεργασία της αίτησης;"
                        } 
                    onCancel={onCancel} 
                    onClose={handleCancelPopupClose} 
                />
            }
        </div>
    )
}

export default ApplicationCreate;