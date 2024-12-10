import s from "./HomeStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Home(){
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

    return (
        <div className={s.home_page}>
            <div className={s.background_pic}>
                <div className={s.search_text_row}>
                    <div className={s.search_column}>
                        <div className={s.location_search}>
                            <p>Αναζήτηση με βάση την περιοχή</p>
                            <div className={s.search_area}>
                                <FontAwesomeIcon icon={faLocationDot} className={s.location_icon} />
                                <input type="text" placeholder="Γλυφάδα, Αττική"/>
                                <div className={s.location_search_button}>
                                    <FontAwesomeIcon icon={faSearch} className={s.search_icon} />    
                                </div>
                            </div>
                        </div>
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
                            <div className={s.famous_searches_search_button}>
                                <p>Αναζήτηση</p>
                            </div>
                        </div>
                    </div>
                    <h1>Βρείτε νταντά ή εργαστείτε ως νταντά,
                        <span> εύκολα </span>
                        και
                        <span> γρήγορα
                            <span className={s.exclamation}>!</span>
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Home;