import React from "react";
import s from "./WhatDoesABabysitterDoStyle.module.css";
import babysitter_icon3 from "../../../../../Assets/Icons/babysitter_icon3.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function WhatDoesABabysitterDo({isOpen, toggleInnerSections}) {

    return (
        <div className={s.who_is_allowed_the_voucher}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("whatDoesABabysitterDo")}
            >
                <p>Τι κάνει μια νταντά;</p>
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
                        <img src={babysitter_icon3} alt="Babysitter Icon" />
                        <div className={s.step_text}>
                            <ul>
                                <li>
                                    <p><span>Φροντίζει</span> βρέφη & νήπια ηλικίας 2 μηνών έως 2,5 ετών.</p>
                                </li>
                                <li>
                                    <p>Παρέχει <span>επιπλέον υπηρεσίες</span> κατ’ οίκον (μαγείρεμα, καθαρισμός σπιτιού), 
                                        <span> εφόσον το επιθυμεί</span> η ίδια και η οικογένεια.
                                    </p>
                                </li>
                                <li>
                                    <p>Δηλώνει <span>ημέρες και ώρες διαθεσιμότητας</span>, στις οποίες, κατόπιν επικοινωνίας με την 
                                        οικογένεια, παρέχει τις υπηρεσίες της.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhatDoesABabysitterDo;
