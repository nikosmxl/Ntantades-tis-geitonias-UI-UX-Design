import React from "react";
import s from "./HowToChooseBabysitterStyle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faSearch, faCalendarDays, faHandshake } from "@fortawesome/free-solid-svg-icons";
import babysitter_icon2 from "../../../../Assets/Icons/babysitter_icon2.png"


function HowToChooseBabysitter({isOpen, toggleInnerSections}) {

    return (
        <div className={s.how_to_choose_babysitter}>
            <button
                className={`${s.inner_instruction} ${isOpen ? s.open : ''}`}
                onClick={() => toggleInnerSections("howToChooseBabysitter")}
            >
                <p>Πώς επιλέγω νταντά;</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.inner_instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div className={s.inner_instruction_content}>
                    <div className={s.steps_row}>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={babysitter_icon2} alt="Search babysitter step" />
                                <FontAwesomeIcon icon={faSearch} className={s.icon_front}/>
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                <span>Αναζητήσετε</span> μέσα από μια ευρεία λίστα
                                τις διαθέσιμες Νταντάδες  που εξυπηρετούν 
                                στην περιοχή σας.
                                </p>
                            </div>
                        </div>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={babysitter_icon2} alt="Meeting step" />
                                <FontAwesomeIcon icon={faCalendarDays} className={s.icon_front}/>
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Κάνετε <span>αίτηση ενδιαφέροντος</span> συνεργασίας
                                     με την Νταντά της αρεσκείας σας και να 
                                     προγραμματίσετε το <span>ραντεβού γνωριμίας.</span>
                                </p>
                            </div>
                        </div>
                        <div className={s.step}>
                            <div className={s.white_circle}>
                                <img src={babysitter_icon2} alt="Partnership step" />
                                <FontAwesomeIcon icon={faHandshake} className={s.icon_front}/>
                            </div>
                            <div className={s.white_rect}>
                                <p>
                                    Συνεργαστείτε και επίσημα με την νταντά, 
                                    αφού υπογράψετε το <span>Συμφωνητικό Συνεργασίας.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowToChooseBabysitter;
