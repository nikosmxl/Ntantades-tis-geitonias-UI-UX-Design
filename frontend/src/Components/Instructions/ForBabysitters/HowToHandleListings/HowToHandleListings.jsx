import React from "react";
import s from "./HowToHandleListingsStyle.module.css";
import papers_icon from "../../../../Assets/Icons/papers_icon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

function HowToHandleListings({isOpen, toggleInnerSections}) {

    return(
        <div className={s.how_to_handle_Listings}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToHandleListings")}
            >
                <p>Πώς διαχειρίζομαι τις αγγελίες μου;</p>
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
                        <img src={papers_icon} alt="Listings Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p>
                                        Μπορείτε να προβάλλετε τις αγγελίες που έχετε υποβάλει, 
                                        και αν επιθμείτε να τις διαγράψετε
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Μπορείτε να προβάλετε τις αγγελίες που έχετε υπό επεξεργασία, να τις τροποποιήσετε, 
                                        να τις διαγράψετε ή να δημιουργήσετε νέες
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

export default HowToHandleListings;