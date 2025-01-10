import s from "./ParticipantStatesStyle.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import states from "../../../Assets/Pictures/states.png"
import states2 from "../../../Assets/Pictures/states2.png"

function ParticipantStates({isOpen, toggleSection}){
    return (
        <div className={s.how_it_works}>
            <button
                className={`${s.instruction_item} ${isOpen ? s.open : ''}`}
                onClick={() => toggleSection("participantStates")}
            >
                <p>Δήμοι που συμμετέχουν στην εφαρμογή</p>
                {isOpen ? 
                <FontAwesomeIcon icon={faAngleUp} className={s.angle_icon}/>
                : 
                <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon}/>
                }
            </button>
            <div className={`${s.instruction_dropdown} ${isOpen ? s.open : ''}`}>
                <div className={s.instruction_content}>
                    <img src={states2} alt="Participant States" />
                    <img src={states} alt="Participant States" />
                </div>
            </div>
        </div>
    )
}

export default ParticipantStates;