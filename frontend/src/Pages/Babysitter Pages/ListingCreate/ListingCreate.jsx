import { useEffect, useState } from "react";
import s from "./ListingCreateStyle.module.css"
import Select from 'react-select'
import Checkbox from "../../../Components/Checkbox/Checkbox";
import Timetable from "../../../Components/Timetable/Timetable";
import DateDropdowns from "../../../Components/DateDropdowns/DateDropdowns";
import ErrorFields from "../../../Components/ErrorFields/ErrorFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGavel, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import ConfirmationPopUp from "../../../PopUps/ConfirmationPopUp/ConfirmationPopUp";
import { useNavigate, useParams } from "react-router-dom";
import DropdownAreas from "../../../Components/DropdownAreas/DropdownAreas";

function ListingCreate(){
    const fullname = "Μπάμπης Μπαμπάκης";
    const age = 26;

    const experience = "5 έτη"
    const experience_with_ages = ["0-6 months", "6-12 months"];

    const [workingHours, setWorkingHours] = useState(null);
    
    const [areas, setAreas] = useState([{ city: null, neighborhoods: [] }]);

    const [availabilityList, setAvailabilityList] = useState([]);

    const [startingDate, setStartingDate] = useState({});
    const [endingDate, setEndingDate] = useState({});

    const specialties = ["Disabled"];
    const [transportation, setTransportation] = useState([]);
    const languages = ['English', 'Spanish'];
    const [services, setServices] = useState([]);

    const [fewWords, setFewWords] = useState("");

    const [error, setError] = useState(null);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const dictionaries = {
        experience_with_ages: {
            "0-6 months": "0-6 μηνών",
            "6-12 months": "6-12 μηνών",
            "1-2 years": "1-2 ετών",
            ">2 years": ">2 ετών",
        },
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

    const openConfirmPopup = () => {
        setIsConfirmPopupOpen(true);
    }

    const handleConfirmPopupClose = () => {
        setIsConfirmPopupOpen(false); // Κλεινει το PopUp
    };

    const onConfirm = () => {
      // api call to save
      // check status
      navigate('/babysitter/listings', {state: {status: 'publish'}});
    }

    const openCancelPopup = () => {
        setIsCancelPopupOpen(true);
    }

    const handleCancelPopupClose = () => {
        setIsCancelPopupOpen(false); // Κλεινει το PopUp
    };

    const onCancel = () => {
      navigate('/babysitter/listings');
    };

    const handleTemporarySave = () => {
      navigate('/babysitter/listings', {state: {status: 'publish'}});
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
        
        const hasAtLeastOneCity = areas.some(area => area.city);
        const hasCityWithoutNeighborhoods = areas.some(area => area.city && area.neighborhoods.length === 0);

        if (!hasAtLeastOneCity) {
            missingFields.add("Περιοχές εξυπηρέτησης");
        } else if (hasCityWithoutNeighborhoods) {
            missingFields.add("Περιοχές εξυπηρέτησης (Συμπληρώστε τις γειτονίες σας σε κάθε πόλη)");
        }

        if (workingHours === null){
            missingFields.add("Χρόνος απασχόλησης");
        }
        if (availabilityList.length === 0){
            missingFields.add("Διαθεσιμότητα και ώρες");
        }
        if (Object.keys(startingDate).length === 0){
            missingFields.add("Από πότε θα είστε διαθέσιμος/η;");
        }
        if (Object.keys(endingDate).length === 0){
            missingFields.add("Εώς πότε θα είστε διαθέσιμος/η;");
        }
    
        if (missingFields.size === 0) {
            setError(null); // Όλα τα πεδία είναι συμπληρωμένα
        } else {
            const errorMessage = `Κάποια από τα υποχρεωτικά πεδία δεν συμπληρώθηκαν: ${Array.from(missingFields).join(", ")}`;
            setError(errorMessage);
        }
    }, [workingHours, availabilityList, startingDate, endingDate, areas]);
    
    return (
        <div className={s.container}>
            <div className={s.breadcrumbs}>
                <p>Αρχική</p>
                <p>{">"}</p>
                <p>Αγγελίες</p>
                <p>{">"}</p>
                <p>Δημιουργία νέας Αγγελίας</p>
            </div>

            <h3 className={s.title}>Δημιουργία νέας Αγγελίας</h3>
            <p className={s.note}>Τα πεδία με <span>Κόκκινο</span> είναι αμετάβλητα. Επεξεργαστείτε το Προφίλ για να τα αλλάξετε.</p>
            <p className={s.note}>Τα πεδία με αστερίσκο (*) είναι υποχρεωτικά.</p>
            <hr/>

            <div className={s.application_create_container}>
                <div className={s.red_field}>
                    <label htmlFor="fullname">Ονοματεπώνυμο:</label>
                    <input type="text" id="fullname" value={fullname} readOnly />
                </div>

                <div className={s.red_field}>
                    <label htmlFor="age">Ηλικία:</label>
                    <input type="text" id="age" value={age} readOnly />
                </div>

                <div className={s.years_of_experience}>
                    <b>Προϋπηρεσία*:</b>
                    <Select
                        placeholder={experience}
                        isDisabled={true}
                        styles={{
                            container: (provided) => ({
                                ...provided,
                                width: '230px',
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: 'rgba(255, 0, 0, 0.8)',
                            }),
                        }}
                    />
                </div>

                <div className={s.checkbox_area}>
                    <b>Εμπειρία με παιδιά ηλικίας</b>
                    {Object.entries(dictionaries.experience_with_ages).map(([xp, translation]) => (
                        <Checkbox
                            key={xp}
                            name="experienceWithAge"
                            isChecked={experience_with_ages.includes(xp)}
                            readOnly
                            isEnabled={false}
                            isRed
                            label={translation}
                        />
                    ))}
                </div>

                <div className={s.working_places}>
                    <b>Περιοχές  εξυπηρέτησης*</b>
                    <div className={s.dropdowns_area}>
                        <DropdownAreas areas={areas} setAreas={setAreas} />
                    </div>
                </div>

                <div className={s.working_hours}>
                    <b>Χρόνος απασχόλησης*</b>
                    {["Full-Time", "Part-Time"].map(option => (
                        <Checkbox
                            key={option}
                            name="workinghrs"
                            isChecked={workingHours === option}
                            onChange={() => setWorkingHours(option)}
                            label={option === "Full-Time" ? "Πλήρης απασχόληση" : "Μερική απασχόληση"}
                        />
                    ))}
                </div>

                <div className={s.calendar_area}>
                    <b>Διαθεσιμότητα και ώρες*</b>
                    <Timetable width="400px" height="220px" onChange={setAvailabilityList} checkedSlots={availabilityList} />
                </div>

                <div className={s.starting_date}>
                    <b>Από πότε θα είστε διαθέσιμος/η;*</b>
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
                    <b>Εώς πότε θα είστε διαθέσιμος/η;*</b>
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
                            name="language"
                            isChecked={languages.includes(language)}
                            isEnabled={false}
                            isRed
                            label={translation}
                        />
                    ))}
                </div>
                
                <div className={s.checkbox_area}>
                    <b>Υπηρεσίες</b>
                    {Object.entries(dictionaries.services).map(([service, translation]) => (
                        <Checkbox
                            key={service}
                            name="services"
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
                        onClick={handleTemporarySave}
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
                    context={"Είστε σίγουρος ότι θέλετε να υποβάλετε οριστικά την αγγελία;"} 
                    onConfirm={onConfirm} 
                    onClose={handleConfirmPopupClose} 
                />
            }
            {isCancelPopupOpen && 
                <ConfirmationPopUp
                    context={params.listingId == null
                            ? 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την δημιουργία της αγγελίας; Η αγγελία δεν θα αποθηκευτεί." 
                            : 
                            "Είστε σίγουρος/η ότι θέλετε να ακυρώσετε την επεξεργασία της αγγελίας;"
                        } 
                    onConfirm={onCancel} 
                    onClose={handleCancelPopupClose} 
                />
            }
        </div>
    )
}

export default ListingCreate;