import s from "./ListingStyle.module.css"
import troll_prof from "../../Assets/Pictures/troll_prof.jpg"
import Timetable from "../Timetable/Timetable";
import { useState } from "react";
import ExpandButtons from "../ExpandButtons/ExpandButtons";

function Listing({ isHistory = false, isEditable = false }){
    const [availabilityList, setAvailabilityList] = useState([ [0, 1], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4] ]);
    
    const sample = {
        "name": "Γεωργία Χατζηνικολάου",
        "age": "27 ετών",
        "working_xp": "5 έτη",
        "experience_with_kids_age_of": [
            "6-12 μηνών",
            "1-2 ετών"
        ],
        "places_of_service": {
            "ΔΗΜΟΣ ΚΑΛΛΙΘΕΑΣ": ["Τζιτζιφιές", "Αγία Ελεούσα"],
            "ΔΗΜΟΣ ΠΕΙΡΑΙΩΣ": ["Καλλίπολη", "Καστέλλα", "Καμίνια"]
        },
        "languages_knowledge": [
            "Αγγλικά",
            "Γαλλικά"
        ],
        "specialties": ["Νοηματική"],
        "children_transportation": "Με Ι.Χ. Οικογένειας",
        "services": [
            "Μαγειρέμα",
            "Καθαρισμός Σπιτιού",
            "Βοήθεια με μαθήματα",
            "Δραστηριότητες Εξωτερικού Χώρου"
        ],
        "working_hours": "Πλήρης απασχόληση",
        "availability": availabilityList,
        "available_from": "Άμεσα διαθέσιμος/η",
        "available_until": "Αόριστο",
        "few_words": "Είμαι ευγενική, υπομονετική, σεβαστική και πολύ αγαπημένη με τα παιδιά! Μου αρέσει αυτό που κάνω για αυτό το κάνω με όρεξη και μεράκι. Σπούδασα στο Πανεπιστήμιο της Πάτρας Βρεφονηπιοκομία και έχω κάνει και σεμινάρια με τίτλο 'Επιστήμη της Υγείας', μαζί με σεμινάρια φωνηού φροντίδας. Θα χαρώ πολύ να συνεργαστούμε και να μπορέσω να είμαι χρήσιμη και να προσφέρω!"
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleIsExpanded2 = () => {
        setIsExpanded2(!isExpanded2);
    };

    const setVariables = () => {
        toggleIsExpanded2();
        setTimeout(() => {
            toggleIsExpanded();
        }, 250);
    }

    const setVariables2 = () => {
        toggleIsExpanded2();
        toggleIsExpanded();
    }

    return (
        <div className={s.listing_with_buttons}>
            <div className={`${s.listing} ${isExpanded2 ? s.open : ''}`}>
                <img src={troll_prof} alt="Profile" />
                <div className={`${s.second_column} ${!isExpanded ? s.collapsed : ''}`}>
                    <p><span>Ονοματεπώνυμο:</span>{sample.name}</p>
                    <p><span>Ηλικία:</span>{sample.age}</p>
                    <p><span>Προϋπηρεσία:</span>{sample.working_xp}</p>
                    <p><span>Εμπειρία με παιδιά ηλικίας:</span></p>
                    <ul>
                        {sample.experience_with_kids_age_of.map((experience, index) => (
                            <li key={index}>
                                <p>{experience}</p>
                            </li>
                        ))}
                    </ul>
                    <p className={s.always_show}><span className={s.always_show}>Περιοχές εξυπηρέτησης:</span></p>
                    <ul className={s.always_show}>
                        {Object.entries(sample.places_of_service).map(([region, areas], index) => (
                            <li key={index} className={s.region_areas_list}>
                                <p className={s.always_show}>{region}:</p>
                                <div className={s.areas_list}>
                                    {areas.join(", ")}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p><span>Γνώσεις ξένων γλωσσών:</span>{sample.languages_knowledge.join(", ")}</p>
                    <p><span>Ειδίκευση σε:</span>{sample.specialties.join(", ")}</p>
                    <p><span>Μετακίνηση παιδιών:</span>{sample.children_transportation}</p>
                    <p><span>Υπηρεσίες:</span></p>
                    <ul>
                        {sample.services.map((experience, index) => (
                            <li key={index}>
                                <p>{experience}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${s.third_column} ${!isExpanded ? s.collapsed : ''}`}>
                    <p className={s.always_show}><span className={s.always_show}>Χρόνος απασχόλησης:</span>{sample.working_hours}</p>
                    <p><span>Διαθεσιμότητα και ώρες:</span></p>
                    <div className={s.timetable}>
                        <Timetable width="360px" height="200px" isEnabled={false} checkedSlots={sample.availability} onChange={setAvailabilityList} />
                    </div>
                    <p><span>Διαθέσιμος/η από:</span>{sample.available_from}</p>
                    <p><span>Διαθέσιμος/η εώς:</span>{sample.available_until}</p>
                    <p><span>Λίγα λόγια:</span></p>
                    {/* <div className={s.rect}></div> */}
                    <p className={s.few_words}>{sample.few_words}</p>
                </div>
                <p className={`${s.listing_date} ${!isExpanded ? s.collapsed : ''}`}>25/12/2024</p>
            </div>
            <ExpandButtons isExpanded={isExpanded} toggleIsExpanded={isExpanded ? setVariables : setVariables2}
                showOptionsButtons={!isHistory} showDeleteButton={true}
                showEditButton={isEditable} 
            />
        </div>
    )
}

export default Listing;