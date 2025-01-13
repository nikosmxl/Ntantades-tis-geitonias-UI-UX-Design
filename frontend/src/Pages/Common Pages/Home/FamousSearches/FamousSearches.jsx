import { useNavigate } from "react-router-dom";
import s from "./FamousSearchesStyle.module.css"
import { useState } from "react";

function FamousSearches(){
    const [checkedItems, setCheckedItems] = useState({
        cooking: false,
        firstAid: false,
        babysitterCertificate: false,
        homeworkHelp: false,
        englishNativeSpeaker: false
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const navigate = useNavigate();

    return (
        <div className={s.famous_searches}>
            <p>Δημοφιλείς αναζητήσεις</p>
            <label className={s.checkbox_label}>
                <input
                type="checkbox"
                name="cooking"
                checked={checkedItems.cooking}
                onChange={handleCheckboxChange}
                />
                <span className={s.checkmark}></span>
                Μαγείρεμα
            </label>
            <label className={s.checkbox_label}>
                <input
                type="checkbox"
                name="firstAid"
                checked={checkedItems.firstAid}
                onChange={handleCheckboxChange}
                />
                <span className={s.checkmark}></span>
                Α` βοήθειες
            </label>
            <label className={s.checkbox_label}>
                <input
                type="checkbox"
                name="babysitterCertificate"
                checked={checkedItems.babysitterCertificate}
                onChange={handleCheckboxChange}
                />
                <span className={s.checkmark}></span>
                Πιστοποίηση Νταντά
            </label>
            <label className={s.checkbox_label}>
                <input
                type="checkbox"
                name="homeworkHelp"
                checked={checkedItems.homeworkHelp}
                onChange={handleCheckboxChange}
                />
                <span className={s.checkmark}></span>
                Βοήθεια με μαθήματα
            </label>
            <label className={s.checkbox_label}>
                <input
                type="checkbox"
                name="englishNativeSpeaker"
                checked={checkedItems.englishNativeSpeaker}
                onChange={handleCheckboxChange}
                />
                <span className={s.checkmark}></span>
                English Native Speaker
            </label>
            <div className={s.famous_searches_search_button} onClick={() => navigate('./babysitter-search')}>
                <p>Αναζήτηση</p>
            </div>
        </div>
    )
}

export default FamousSearches;