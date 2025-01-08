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
import CancelationPopUp from "../../../PopUps/CancelationPopUp/CancelationPopUp"

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

    const openConfirmPopup = () => {
        setIsConfirmPopupOpen(true);
    }

    const handleConfirmPopupClose = () => {
        setIsConfirmPopupOpen(false); // Κλεινει το PopUp
    };

    const onConfirm = () => {

    }

    const openCancelPopup = () => {
        setIsCancelPopupOpen(true);
    }

    const handleCancelPopupClose = () => {
        setIsCancelPopupOpen(false); // Κλεινει το PopUp
    };

    const onCancel = () => {
        
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleTransportationChange = (newTransportation) => {
        if (transportation.includes(newTransportation)) {
            setTransportation(transportation.filter(item => item !== newTransportation)); // Αφαίρεση
        } else {
            setTransportation([...transportation, newTransportation]); // Προσθήκη
        }
    }

    const handleLanguagesChange = (newLanguage) => {
        if (languages.includes(newLanguage)) {
            setLanguages(languages.filter(item => item !== newLanguage)); // Αφαίρεση
        } else {
            setLanguages([...languages, newLanguage]); // Προσθήκη
        }
    }

    const handleServicesChange = (newService) => {
        if (services.includes(newService)) {
            setServices(services.filter(item => item !== newService)); // Αφαίρεση
        } else {
            setServices([...services, newService]); // Προσθήκη
        }
    }

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
                    <Checkbox 
                        name={"workinghrs"}
                        isChecked={workingHours === "Full-Time"}
                        onChange={() => setWorkingHours("Full-Time")}
                        label={"Πλήρης απασχόληση"}
                    />
                    <Checkbox 
                        name={"workinghrs"}
                        isChecked={workingHours === "Part-Time"}
                        onChange={() => setWorkingHours("Part-Time")}
                        label={"Μερική απασχόληση"}
                    />
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
                    <Checkbox 
                        name={"specialties"}
                        isEnabled={false}
                        isChecked={specialties.includes("Disabled")}
                        label={"ΑμεΑ"}
                        isRed
                    />
                    <Checkbox 
                        name={"specialties"}
                        isEnabled={false}
                        isChecked={specialties.includes("Sign-Language")}
                        label={"Νοηματική"}
                        isRed
                    />
                </div>

                <div className={s.checkbox_area}>
                    <b>Μετακίνηση παιδιών</b>
                    <Checkbox 
                        name={"transportation"}
                        isChecked={transportation.includes("BabysitterCar")}
                        onChange={() => handleTransportationChange("BabysitterCar")}
                        label={"Με Ι.Χ. Νταντάς"}
                    />
                    <Checkbox 
                        name={"transportation"}
                        isChecked={transportation.includes("FamilyCar")}
                        onChange={() => handleTransportationChange("FamilyCar")}
                        label={"Με Ι.Χ. Οικογένειας"}
                    />
                </div>

                <div className={s.checkbox_area}>
                    <b>Γνώσεις ξένων γλωσσών</b>
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("English")}
                        onChange={() => handleLanguagesChange("English")}
                        label={"Αγγλικά"}
                    />
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("French")}
                        onChange={() => handleLanguagesChange("French")}
                        label={"Γαλλικά"}
                    />
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("Italic")}
                        onChange={() => handleLanguagesChange("Italic")}
                        label={"Ιταλικά"}
                    />
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("Hispanic")}
                        onChange={() => handleLanguagesChange("Hispanic")}
                        label={"Ισπανικά"}
                    />
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("German")}
                        onChange={() => handleLanguagesChange("German")}
                        label={"Γερμανικά"}
                    />
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("Russian")}
                        onChange={() => handleLanguagesChange("Russian")}
                        label={"Ρώσικα"}
                    />
                    <Checkbox 
                        name={"language"}
                        isChecked={languages.includes("Arabic")}
                        onChange={() => handleLanguagesChange("Arabic")}
                        label={"Αραβικά"}
                    />
                </div>
                
                <div className={s.checkbox_area}>
                    <b>Υπηρεσίες</b>
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("Cooking")}
                        onChange={() => handleServicesChange("Cooking")}
                        label={"Μαγείρεμα"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("Cleaning")}
                        onChange={() => handleServicesChange("Cleaning")}
                        label={"Καθαρισμός σπιτιού"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("Ironing")}
                        onChange={() => handleServicesChange("Ironing")}
                        label={"Σιδέρωμα"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("First-aid")}
                        onChange={() => handleServicesChange("First-aid")}
                        label={"Α` βοήθειες"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("BabysitterCertificate")}
                        onChange={() => handleServicesChange("BabysitterCertificate")}
                        label={"Πιστοποίηση νταντάς"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("HomeworkHelp")}
                        onChange={() => handleServicesChange("HomeworkHelp")}
                        label={"Βοήθεια με μαθήματα"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("Trips")}
                        onChange={() => handleServicesChange("Trips")}
                        label={"Εκδρομές / Επισκέψεις"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("EscortActivities")}
                        onChange={() => handleServicesChange("EscortActivities")}
                        label={"Συνοδεία σε Δραστηριότητες"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("OutsideActivities")}
                        onChange={() => handleServicesChange("OutsideActivities")}
                        label={"Δραστηριότητες Εξωτερικού Χώρου"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("AvailableForEmergency")}
                        onChange={() => handleServicesChange("AvailableForEmergency")}
                        label={"Έκτακτη Διαθεσιμότητα"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("EnglishNativeSpeaker")}
                        onChange={() => handleServicesChange("EnglishNativeSpeaker")}
                        label={"English native speaker"}
                    />
                    <Checkbox 
                        name={"services"}
                        isChecked={services.includes("HospitalityOnTheirOwnPlace")}
                        onChange={() => handleServicesChange("HospitalityOnTheirOwnPlace")}
                        label={"Φιλοξενία στην οικία μου"}
                    />
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
                        onClick={() => {}}
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
                <ConfirmationPopUp onConfirm={onConfirm} onClose={handleConfirmPopupClose} />
            }
            {isCancelPopupOpen && 
                <CancelationPopUp onCancel={onCancel} onClose={handleCancelPopupClose} />
            }
        </div>
    )
}

export default ApplicationCreate;